import type { NextPage } from 'next'
import Head from 'next/head'

const AppLayout: NextPage = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Staking</title>
        <meta name="description" content="NFT-Staking" />
      </Head>
      <main className="">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
