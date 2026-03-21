import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import * as fs from 'fs'

export async function POST(request: NextRequest) {
  try {
    const { id, title } = await request.json()

    if (!id || title === undefined) {
      return NextResponse.json({ error: 'ID와 제목이 필요합니다.' }, { status: 400 })
    }

    const configPath = join(process.cwd(), 'src', 'config', 'activities.json')
    let activities = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    
    let found = false
    activities = activities.map((activity: any) => {
      if (activity.id === id) {
        activity.title = title
        found = true
      }
      return activity
    })

    if (!found) {
      return NextResponse.json({ error: '활동 기록을 찾을 수 없습니다.' }, { status: 404 })
    }

    // 날짜 기준 최신순 정렬 (프론트엔드와 통일)
    activities.sort((a: any, b: any) => (b.date || '').localeCompare(a.date || ''))

    fs.writeFileSync(configPath, JSON.stringify(activities, null, 2))

    return NextResponse.json({ success: true, activities })
  } catch (error) {
    console.error('제목 업데이트 에러:', error)
    return NextResponse.json({ error: '업데이트 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
