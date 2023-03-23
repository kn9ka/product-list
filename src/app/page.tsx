import { Shopping } from '@widgets/Shopping'
import { Header } from '@widgets/Header'

export default async function MainPage() {
  return (
    <main className="container mx-auto py-8">
      <Header />
      <Shopping />
    </main>
  )
}
