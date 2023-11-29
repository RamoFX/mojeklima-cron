function log(level, module, message) {
  console.log(`${ level }@${ module }: ${ message }`)
}



export function info(module, message) {
  log('INFO', module, message)
}



export function debug(module, data) {
  log('DEBUG', module, JSON.stringify(data))
}



export function error(module, error) {
  log('ERROR', module, error)
}
