exports.renderDashboard = async(req, res) => {
    res.render('index')
}

exports.renderLogin = (req, res) => {
    res.send(req.url)
}

exports.loginHandler = async (req, res) => {
    res.send(req.url)
}

exports.logoutHandler = (req, res) => {
    res.send(req.url)
}