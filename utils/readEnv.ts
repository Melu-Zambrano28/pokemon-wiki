type ProjectEnv = {
  pokemonAPI: URL
}

const makeProjectEnv = (): ProjectEnv => {
  if (process.env['NEXT_PUBLIC_POKE_API_URL'] == undefined) {
    throw new Error('Missing pokemon API URL')
  }
  return {
    pokemonAPI: new URL(process.env['NEXT_PUBLIC_POKE_API_URL']),
  }
}

const ProjectEnv = makeProjectEnv()

export { ProjectEnv }
