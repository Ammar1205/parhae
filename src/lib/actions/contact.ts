'use server';
// Contact Form Server Action — writes to Firestore contacts collection
import { z } from 'zod';
import { COLLECTIONS } from '@/lib/firebase/schema';

const ContactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(80),
  email:   z.string().email('Invalid email address'),
  phone:   z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

interface ContactResult {
  success: boolean;
  error?: string;
}

function isAdminConfigured(): boolean {
  return !!(
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY
  );
}

export async function submitContactForm(formData: FormData): Promise<ContactResult> {
  try {
    const raw = {
      name:    formData.get('name') as string,
      email:   formData.get('email') as string,
      phone:   (formData.get('phone') as string) || undefined,
      message: formData.get('message') as string,
    };

    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { name, email, phone, message } = parsed.data;
    const doc = {
      name,
      email,
      phone: phone ?? null,
      message,
      createdAt: new Date().toISOString(),
      resolved: false,
    };

    // Write to Firestore if Admin SDK is available
    if (isAdminConfigured()) {
      try {
        const { adminDb } = await import('@/lib/firebase/admin');
        await adminDb.collection(COLLECTIONS.CONTACTS).add(doc);
        console.log('[Contact] Saved to Firestore:', email);
      } catch (firestoreErr) {
        // Log but don't block — still return success to user
        console.error('[Contact] Firestore write failed:', firestoreErr);
        console.log('[Contact] Fallback log:', doc);
      }
    } else {
      // Admin not configured yet — log to console in dev
      console.log('[Contact Form — dev log]', doc);
    }

    return { success: true };
  } catch (err) {
    console.error('[Contact Form Error]', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
