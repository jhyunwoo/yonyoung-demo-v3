import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import * as fs from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const type = formData.get('type') as string || 'gallery'
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const location = formData.get('location') as string
    const mainIndex = parseInt(formData.get('mainIndex') as string || '0')

    const files = formData.getAll('files') as File[]
    const singleFile = formData.get('file') as File

    if (files.length === 0 && !singleFile) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
    }

    const saveFile = async (file: File, folder: string, index: number = 0) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}_${index}_${file.name}`
      const publicPath = join(process.cwd(), 'public', 'images', folder, fileName)
      
      const dir = join(process.cwd(), 'public', 'images', folder)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      
      await writeFile(publicPath, buffer)
      return `/images/${folder}/${fileName}`
    }

    if (type === 'photographer') {
      const url = await saveFile(singleFile, 'photographers')
      return NextResponse.json({ success: true, url })
    }

    // 데이터 파일 경로 설정
    const configFileName = type === 'exhibition' ? 'exhibitions.json' : 'activities.json'
    const configPath = join(process.cwd(), 'src', 'config', configFileName)
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    
    let newItem
    if (type === 'exhibition') {
      const imageUrls = await Promise.all(files.map((file, idx) => saveFile(file, 'exhibitions', idx)))
      
      newItem = {
        id: Date.now(),
        title: title,
        date: date,
        location: location,
        image: imageUrls[mainIndex] || imageUrls[0],
        images: imageUrls,
        description: ""
      }
      configData.unshift(newItem) // 최신이 위로 오게 추가
    } else {
      const imageUrls = await Promise.all(files.map((file, idx) => saveFile(file, 'gallery', idx)))
      
      newItem = {
        id: Date.now(),
        title: title || '제목 없음',
        date: date || new Date().toISOString().split('T')[0],
        coverImage: imageUrls[0],
        images: imageUrls
      }
      configData.unshift(newItem) // 최신이 위로 오게 추가
    }

    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2))

    return NextResponse.json({ success: true, [type === 'exhibition' ? 'exhibition' : 'activity']: newItem })
  } catch (error) {
    console.error('업로드 에러:', error)
    return NextResponse.json({ error: '업로드 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
