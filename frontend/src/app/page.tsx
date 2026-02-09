import { Suspense } from 'react'
import PostsPageTemplate from '@/components/templates/posts-page-template'

export default function Home() {
  return (
    <Suspense>
      <PostsPageTemplate />
    </Suspense>
  )
}
