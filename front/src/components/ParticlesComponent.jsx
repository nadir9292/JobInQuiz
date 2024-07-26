import { loadColorUpdater } from "tsparticles-updater-color"
import { loadCircleShape } from "tsparticles-shape-circle"
import { loadBaseMover } from "tsparticles-move-base"
import { loadSizeUpdater } from "tsparticles-updater-size"
import { loadOpacityUpdater } from "tsparticles-updater-opacity"
import { loadOutModesUpdater } from "tsparticles-updater-out-modes"
import { loadImageShape } from "tsparticles-shape-image"
import Particles from "react-tsparticles"

const ParticlesComponent = (props) => {
  const { isError } = props

  async function particlesInit(engine) {
    await loadColorUpdater(engine)
    await loadCircleShape(engine)
    await loadBaseMover(engine)
    await loadSizeUpdater(engine)
    await loadOpacityUpdater(engine)
    await loadOutModesUpdater(engine)
    await loadImageShape(engine)
  }

  return (
    <div className="particle">
      <Particles
        init={particlesInit}
        options={isError ? particlesErrorOptions : particlesOptions}
      />
    </div>
  )
}

const particlesOptions = {
  fpsLimit: 120,
  particles: {
    color: { value: "#B4ACAC" },
    move: {
      direction: "none",
      enable: true,
      outModes: "out",
      random: false,
      speed: 1,
      straight: false,
    },
    number: { density: { enable: true, area: 2000 }, value: 50 },
    opacity: {
      value: 0.1,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 50, max: 60 },
    },
    zIndex: 0,
  },
}

const particlesErrorOptions = {
  fpsLimit: 120,
  particles: {
    color: { value: "#ffffff" },
    move: {
      direction: "top",
      enable: true,
      outModes: "out",
      random: false,
      speed: 10,
      straight: false,
    },
    number: { density: { enable: true, area: 2000 }, value: 100 },
    opacity: {
      value: 1,
    },
    shape: {
      type: "image",
      image: {
        src: "./error_logo.png",
      },
    },
    size: {
      value: { min: 10, max: 35 },
    },
  },
}

export default ParticlesComponent
