const errorHandler = (error, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'
  if (error.name == 'SequelizeValidationError') {
    status = 400
    message = error.errors[0].message
  }

  if (error.name == 'SequelizeUniqueConstraintError') {
    status = 400
    message = error.errors[0].message
  }

  if (error.name == 'SequelizeDatabaseError' || error.name == 'SequelizeForeignKeyConstraintError') {
    status = 400
    message = 'Invalid input'
  }

  if (error.name == 'InvalidLogin') {
    message = 'Please input email or password'
    status = 401
  }

  if (error.name == 'LoginError') {
    message = 'Invalid email or password'
    status = 401
  }

  if(error.name == 'Unauthorized'){
    message = 'Please login first'
    status = 401
  }

  if(error.name == 'JsonWebTokenError'){
    message = 'Invalid token'
    status = 401
  }

  if(error.name == 'Forbidden'){
    message = `You don't have any access`
    status = 403
  }

  if(error.name == 'NotFound'){
    message = 'Data not found'
    status = 404
  }

  res.status(status).json({
    message
  })
}

module.exports = errorHandler