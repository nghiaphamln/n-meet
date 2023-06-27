class HomeController {
    static Index(req, res) {
        res.render('index', {
            title: 'Trang chủ'
        });
    }

    static Login(req, res) {
        res.render('login', {
            title: 'Đăng nhập'
        });
    }

    static Room(req, res) {
        res.render('room', {
            title: 'Phòng'
        });
    }
}

module.exports = HomeController;