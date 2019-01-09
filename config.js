module.exports = {
    dbUri: process.env.DBURI || `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds117858.mlab.com:17858/tree-stocks`,
    jwtName: 'tsjwt'
}