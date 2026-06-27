// Products API Route - backend.md: clean API endpoints with proper middleware
import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/actions/products';

// Error handling middleware (backend.md: proper error tracking)
function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const featuredParam = searchParams.get('featured');
    const limitParam = searchParams.get('limit');

    const featured = featuredParam === 'true' ? true : featuredParam === 'false' ? false : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
      return errorResponse('limit must be a number between 1 and 100', 400);
    }

    const products = await getProducts({ category, featured, limit });

    return NextResponse.json(
      { data: products, count: products.length },
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (err) {
    console.error('[GET /api/products]', err);
    return errorResponse('Internal server error', 500);
  }
}
