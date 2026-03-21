import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import * as fs from 'fs'

const CONFIG_PATH = join(process.cwd(), 'src', 'config', 'photographers.json')

export async function GET() {
  try {
    const data = JSON.parse(await readFile(CONFIG_PATH, 'utf8'))
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: '데이터를 읽어오는데 실패했습니다.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, photographer, oldName, generation } = body
    
    let photographers = JSON.parse(await readFile(CONFIG_PATH, 'utf8'))

    if (action === 'add') {
      let genGroup = photographers.find((g: any) => g.generation === photographer.generation)
      if (!genGroup) {
        genGroup = { generation: photographer.generation, members: [] }
        photographers.push(genGroup)
      }
      genGroup.members.push(photographer)
      // 기수 역순 정렬
      photographers.sort((a: any, b: any) => parseInt(b.generation) - parseInt(a.generation))
    } 
    else if (action === 'edit') {
      // 기존 기수에서 찾아서 삭제 후 새 기수에 추가 (기수가 바뀔 수 있으므로)
      photographers.forEach((g: any) => {
        g.members = g.members.filter((m: any) => m.name !== oldName)
      })
      
      let genGroup = photographers.find((g: any) => g.generation === photographer.generation)
      if (!genGroup) {
        genGroup = { generation: photographer.generation, members: [] }
        photographers.push(genGroup)
      }
      genGroup.members.push(photographer)
      
      // 빈 기수 그룹 삭제
      photographers = photographers.filter((g: any) => g.members.length > 0)
      photographers.sort((a: any, b: any) => parseInt(b.generation) - parseInt(a.generation))
    }
    else if (action === 'delete') {
      photographers.forEach((g: any) => {
        if (g.generation === generation) {
          g.members = g.members.filter((m: any) => m.name !== oldName)
        }
      })
      photographers = photographers.filter((g: any) => g.members.length > 0)
    }

    await writeFile(CONFIG_PATH, JSON.stringify(photographers, null, 2))
    return NextResponse.json({ success: true, photographers })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: '작업 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
