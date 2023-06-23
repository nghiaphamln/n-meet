class HomeController {
    static Index(req, res) {
        res.render('index', {
            title: 'Trang chủ'
        });
    }
}

module.exports = HomeController;