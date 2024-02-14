import React from 'react'

const Video = () => {
  return (
    <section className="relative w-full h-screen">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover absolute inset-0"
          src="/images/bg.mp4"
        />
      </section>
  )
}

export default Video