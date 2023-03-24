import { NextResponse } from 'next/server'

export async function GET(res: Response) {
  const response = await fetch(
    'https://www.random.org/integers/?num=1&min=50&max=80&col=1&base=10&format=plain&rnd=new',
    { cache: 'no-store' } // Revalidate every 10 seconds
  )

  if (response.ok) {
    const json = await response.json()

    return NextResponse.json(json, {
      headers: { 'Cache-Control': 'no-store max-age=0' },
    })
  }
}
