exports.log = message => {
  console.log(message);
}

exports.promlog = message => {
  return ret => {
    log(message)
    return ret
  }
}
