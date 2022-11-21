import React from 'react'
import FormConnect from '@components/FormConnect'
import Head from 'next/head'

const connect = () => {
  return (
    <>
      <Head>
        <title>Connect con broker</title>
      </Head>
      <FormConnect />
    </>
  )
}

export default connect