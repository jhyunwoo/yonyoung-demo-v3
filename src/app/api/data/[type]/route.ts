 import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import * as fs from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const type = params.type
    const configPath = join(process.cwd(), 'src', 'config', `${type}.json`)

    if (!fs.existsSync(configPath)) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 })
    }

    const fileContent = fs.readFileSync(configPath, 'utf8')
    const data = JSON.parse(fileContent)

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Data fetch error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
