import React, { useEffect, useRef, useState } from "react"
import  "./styles.css"

const getY = () => {
  const doc = document.scrollingElement || document.documentElement
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
}

const setScrollY = (val) => {
  const doc = document.scrollingElement || document.documentElement
  doc.scrollTop = val;
}

const getWidth = () => {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  )
}

const getHeight = () => {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  )
}

let mouseDownStatus;
let prevX;
let prevY;

const Home3 = () => {
  const home = useRef(null)
  const horizontal = useRef(null)
  const intro = useRef(null)
  const work = useRef(null)
  const services = useRef(null)
  const clients = useRef(null)
  const people = useRef(null)

  const [cssHeight, setCssHeight] = useState("100vh")
  const [height, setHeight] = useState(0)
  const [x, setX] = useState("0px")
  const [y, setY] = useState("0px")
  const [slides, setSlides] = useState([])
  // const [mouseDownStatus, setMouseDownStatus] = useState(false);
  const [downPosX, setDownPosX] = useState(0);
  const [downPosY, setDownPosY] = useState(0);

  let mouseDownHandler;
  let mouseMoveHandler;
  let mouseUpHandler;
  // get sizes
  useEffect(() => {
    // get widths
    // intro, work, services
    mouseDownHandler = window.addEventListener('mousedown', handleMouseDownHandler);
    mouseMoveHandler = window.addEventListener('mousemove', handleMouseMoveHandler);
    mouseUpHandler = window.addEventListener('mouseup', handleMouseUpHandler);

    let d = 0
    ;[intro, work, services].forEach(ref => {
      if (ref && ref.current) {
        let rect = ref.current.getBoundingClientRect()
        d += rect.width
      }
    })
    setHeight(d)
    setCssHeight(`${d}px`)
  })

  let scrollHandler;

  useEffect(() => {
    if (height > 0) {
      scrollHandler = window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
      if (mouseDownHandler) {
        window.removeEventListener("mousedown", mouseDownHandler);
      }
      if (mouseMoveHandler) {
        window.removeEventListener("mousemove", mouseMoveHandler);
      }
      if (mouseUpHandler) {
        window.removeEventListener("mouseup", mouseUpHandler);
      }
    }
  })

  const handleScroll = e => {
    let pageY = getY()
    let w = getWidth()
    let h = getHeight()
    let maxX = height - w
    let maxY = height - h
    let x = `-${Math.min(maxX, pageY)}px`
    let y = Math.min(pageY, maxY)
    setX(x)
    setY(`${y}px`)
  }

  const handleMouseDownHandler = e => {
    if (!mouseDownStatus) {
      mouseDownStatus = true;
      setDownPosX(e.x);
      setDownPosY(e.y);
      prevX = e.x;
      prevY = e.y;
    }
  }

  const handleMouseUpHandler = e => {
    if (mouseDownStatus) {
      mouseDownStatus = false;
    }
  }

  const handleMouseMoveHandler = e => {
    if (mouseDownStatus) {
      let pageY;

        if (Math.abs(prevX - e.x) > Math.abs(prevY - e.y)) {
          pageY = getY() + (prevX - e.x);
        } else {
          pageY = getY() + (prevY - e.y);
        }

        setScrollY(pageY);
        // pageY = pageY;
  
        let w = getWidth();
        let h = getHeight();
        let maxX = height - w;
        let maxY = height - h;
        let x = `-${Math.min(maxX, pageY)}px`;
        let y = Math.min(pageY, maxY);
        
        setX(x);
        setY(`${y}px`);
        prevX = e.x;
        prevY = e.y;
    }
  }

  return (
    <div ref={home} style={{ minHeight: cssHeight }} className="Home">
      <div
        ref={horizontal}
        className="Horizontal"
        style={{ height: cssHeight }}
      >
        
        <section
          ref={intro}
          className="Intro"
          style={{ transform: `translate(${x}, ${y})` }}
        >
          <h1>Intro</h1>
        </section>
        <section
          ref={work}
          className="Work"
          style={{ transform: `translate(${x}, ${y})` }}
        >
          <h1>Work</h1>
        </section>
        <section
          ref={services}
          className="Services"
          style={{ transform: `translate(${x}, ${y})` }}
        >
          <h1>Services</h1>
        </section>
      </div>

      <section ref={clients} className="Clients">
        <h1>Clients</h1>
      </section>
      <section ref={people} className="People">
        <h1>People</h1>
      </section>
    </div>
  )
}

export default Home3
