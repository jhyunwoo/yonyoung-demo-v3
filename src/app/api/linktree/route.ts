import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const CONFIG_PATH = join(process.cwd(), 'src', 'config', 'linktree.json')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, link, oldName } = body
    
    let linktree = JSON.parse(await readFile(CONFIG_PATH, 'utf8'))

    if (action === 'add') {
      linktree.push(link)
    } 
    else if (action === 'edit') {
      const index = linktree.findIndex((l: any) => l.name === oldName)
      if (index !== -1) {
        linktree[index] = link
      }
    }
    else if (action === 'delete') {
      linktree = linktree.filter((l: any) => l.name !== oldName)
    }

    await writeFile(CONFIG_PATH, JSON.stringify(linktree, null, 2))
    return NextResponse.json({ success: true, linktree })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: '작업 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
