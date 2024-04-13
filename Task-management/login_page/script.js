let login_btn = document.querySelector('.btn_login_form')
document.getElementById('email').value =''
document.getElementById('password').value =''
let check_box = document.getElementById('check_box')
let kiem = 0

if (localStorage.getItem('OK')) {
    window.location.href = '../task_page/task.html'
}
// Khai báo hàm loginUser với hai tham số: login và password
function loginUser(login, password) {
    login = document.getElementById('email').value
    console.log(login)
    password = document.getElementById('password').value
    console.log(password)

    const url = 'https://recruitment-api.pyt1.stg.jmr.pl/login';
    const data = {
        login: login,
        password: password
    };

    // Trả về một Promise
    return new Promise(function(resolve, reject) {
        // Gửi yêu cầu POST đến URL với dữ liệu được chuyển đổi sang JSON
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        // Xử lý phản hồi từ máy chủ
        .then(function(response) {
            // Kiểm tra xem phản hồi có thành công hay không
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Nếu thành công, chuyển đổi phản hồi sang dạng JSON và trả về
            return response.json();
        })
        // Xử lý dữ liệu JSON từ phản hồi, đã lấy dữ liệu về
        .then(function(responseData) {
            console.log(responseData);
            // Kiểm tra trạng thái và tin nhắn từ phản hồi
            if (responseData.status === 'ok') {
                // Nếu trạng thái là 'ok', giải quyết Promise với thông báo thành công
                if (check_box.checked == true) {
                    localStorage.setItem('OK', JSON.stringify('Đã đăng nhập thành công lâu dài'))
                }
                else if (check_box.checked != true){
                    localStorage.setItem('OKE', JSON.stringify('Đã đăng nhập tạm thời'))
                }
                window.location.href = '../task_page/task.html'
                resolve('Đăng nhập thành công: ' + responseData.message);
                // resolve('../task_page/task.html');
            } else {
                // Nếu trạng thái không phải 'ok', từ chối Promise với thông báo lỗi
                reject('Đăng nhập không thành công: ' + responseData.message);
            }
        })
        // Xử lý lỗi nếu có
        .catch(function(error) {
            // Nếu có lỗi, từ chối Promise với thông báo lỗi
            reject('There was a problem with the fetch operation: ' + error);
        });
    });
}
login_btn.addEventListener('click', function() {
    loginUser()
    .then(function(message) {
        // Nếu Promise được giải quyết, in ra thông báo thành công
        console.log(message);
    })
    .catch(function(error) {
        // Nếu Promise bị từ chối, in ra thông báo lỗi
        console.log(error);
    });
})





