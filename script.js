(() => {
    const $ = document.querySelector.bind(document);

    let timer = 5000;
    let isRotating = false;
    let isRotatingRandom = false;
    let currentRotate1 = 0;
    let currentRotateRandom = 0;

    let numberWheel = 5;
    let count = 1;
    let quesright = 0;
    let scrore = 0;
    let stt = 0;
    let ranques = 0;

    const wheel = $('.wheel');
    const displayConfirm = $('.div-confirm');
    const btnStart = $('.btn-start');
    const btnStartRandom = $('.btn-start-random');
    const msg = $('.msg');
    const msgRandom = $('.msg-random');
    const qus = $('.question');
    const btnConfirm = $('.btn-confirm');
    const btnConfirmRandom = $('.btn-confirm-random');
    const btnPlay = $('.btn-play');
    const btnPlayNew = $('.btn-play-new');
    const resText = $('.result-text');
    const numWheel = $('.number-wheel');
    const numQues = $('.number-question');
    const txtScore = $('.scrore');

    const wheelRandom = $('.wheel-random');

    let resSave = '';
    let localSave = '';
    const save = $('.result');

    btnPlay.addEventListener('click', () => {
        Play()
    });

    const Play = () => {
        let name = document.getElementById('name-play').value;
        if (name == '') {
            alert("Chưa nhập họ và tên");
            document.getElementById('name-play').focus();
        }
        else {
            btnPlayNew.removeAttribute("disabled");
            btnStart.removeAttribute("disabled");
            btnPlay.setAttribute("disabled", "disabled");
            document.getElementById('name-play').setAttribute("disabled", "disabled");
            numberWheel = 5;
            quesright = 0;
            count = 1;
            stt = stt + 1;
        }

    };

    btnPlayNew.addEventListener('click', () => {
        PlayNew()
        scrore = 0;
        txtScore.innerHTML = `Số nến thắp được: ${scrore}`;
    });

    const PlayNew = (event) => {
        document.getElementById('name-play').value = "";
        btnPlay.removeAttribute("disabled");
        btnPlayNew.setAttribute("disabled", "disabled");
        btnStart.setAttribute("disabled", "disabled");
        document.getElementById('name-play').removeAttribute("disabled");
        displayConfirm.style.display = 'none';
        numberWheel = 5;
        quesright = 0;
        count = 1;
        resSave = '';
        localSave = '';
        numWheel.innerHTML = `Số lượt quay: ${numberWheel}`;
        numQues.innerHTML = `Số câu trả lời đúng: ${quesright}`;
        msg.innerHTML = ``;
        qus.innerHTML = ``;
        resText.innerHTML = ``;
        save.innerHTML = ``;
    };

    //------- Tổng các ô phải là 100% -------
    const listGift = [
        {
            txtName: 'Câu hỏi',
            percent: 20 / 100
        },
        {
            txtName: 'Bạn được 3 nến',
            percent: 2 / 100
        },
        {
            txtName: 'Câu hỏi',
            percent: 20 / 100
        },
        {
            txtName: 'Bạn được 5 nến',
            percent: 3 / 100
        },
        {
            txtName: 'Câu hỏi',
            percent: 20 / 100
        },
        {
            txtName: 'Thêm lượt',
            percent: 5 / 100
        },
        {
            txtName: 'Câu hỏi',
            percent: 20 / 100
        },
        {
            txtName: 'Mất lượt',
            percent: 5 / 100
        },
        {
            txtName: 'Nến ngẫu nhiên',
            percent: 5 / 100
        },
    ];

    const listGiftRandom = [
        {
            txtName: 'Bạn được 5 nến',
            percent: 15 / 100
        },
        {
            txtName: 'Bạn được 10 nến',
            percent: 42 / 100
        },
        {
            txtName: 'Bạn được 3 nến',
            percent: 1 / 100
        },
        {
            txtName: 'Bạn được 10 nến',
            percent: 42 / 100
        },
    ];

    const size = listGift.length;
    const rotate = 360 / size; // số góc 1 phần thưởng chiếm trong vòng quay
    const skewY = 90 - rotate; // độ nghiêng của 1 item

    const sizerandom = listGiftRandom.length;
    const rotaterandom = 360 / sizerandom;
    const skewYrandom = 90 - rotaterandom;

    const renderItem = () => {
        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li');

            itemGift.style.transform = `
                rotate(${rotate * index}deg)
                skewY(-${skewY}deg)
            `;
            if (index % 2 == 0 && index < 8) {
                itemGift.innerHTML = `
                    <p class="text-item-even" 
                        style="transform: skewY(${skewY}deg)
                            rotate(${rotate / 2}deg)"
                        >
                        <b>${item.txtName}</b>
                    </p>
                `;
            }
            if (index % 2 != 0 && index < 8) {
                itemGift.innerHTML = `
                    <p class="text-item" 
                        style="transform: skewY(${skewY}deg)
                            rotate(${rotate / 2}deg)"
                        >
                        <b>${item.txtName}</b>
                    </p>
                `;
            }
            if (index == 8) {
                itemGift.innerHTML = `
                    <p class="text-item-random" 
                        style="transform: skewY(${skewY}deg)
                            rotate(${rotate / 2}deg)"
                        >
                        <b>${item.txtName}</b>
                    </p>
                `;
            }
            wheel.appendChild(itemGift);
        })
    };

    const renderItemRandom = () => {
        listGiftRandom.forEach((item, index) => {
            const itemGift = document.createElement('li');

            itemGift.style.transform = `
                rotate(${rotaterandom * index}deg)
                skewY(-${skewYrandom}deg)
            `;
            if (index % 2 != 0) {
                itemGift.innerHTML = `
                    <p class="text-item-even" 
                        style="transform: skewY(${skewYrandom}deg)
                            rotate(${rotaterandom / 2}deg)"
                        >
                        <b>${item.txtName}</b>
                    </p>
                `;
            }
            else {
                itemGift.innerHTML = `
                    <p class="text-item" 
                        style="transform: skewY(${skewYrandom}deg)
                            rotate(${rotaterandom / 2}deg)"
                        >
                        <b>${item.txtName}</b>
                    </p>
                `;
            }
            wheelRandom.appendChild(itemGift);
        })
    };

    const rotatewheel = (currentRotate, index) => {
        wheel.style.transform = `rotate(${currentRotate - index * rotate - rotate / 2
            }deg)`;
    };

    const rotatewheelRandom = (currentRotate, index) => {
        wheelRandom.style.transform = `rotate(${currentRotate - index * rotaterandom - rotaterandom / 2
            }deg)`;
    };

    const getGift = (randomNumber) => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item, index) => {
            currentPercent += item.percent;

            randomNumber <= currentPercent && list.push({
                ...item, index
            });
        });
        return list[0];
    };

    const getGiftRandom = (randomNumber) => {
        let currentPercent = 0;
        let list = [];

        listGiftRandom.forEach((item, index) => {
            currentPercent += item.percent;

            randomNumber <= currentPercent && list.push({
                ...item, index
            });
        });
        return list[0];
    };

    const showTxtGift = (txt, n1, n2) => {
        setTimeout(() => {
            isRotating = false;
            let ques = "";
            ranques = Math.floor(Math.random() * 5) + 1;
            if (txt == 'Câu hỏi') {
                txt = 'Câu hỏi số ' + ranques;
                switch (ranques) {
                    case 1:
                        ques = `
                        <p style="font-weight: bold;">1. Năm 2023 là năm kỷ niệm bao nhiêu năm “Ngày Thương binh - Liệt sỹ”</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="A" /> A. 74 năm.</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="B" /> B. 75 năm.</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="C" /> C. 76 năm.</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="D" /> D. 77 năm.</p>
                        `;
                        break;
                    case 2:
                        ques = `
                        <p style="font-weight: bold;">2. Tên gọi đầu tiên của “Ngày Thương binh - Liệt sỹ” là gì?</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="A" /> A. Ngày Thương binh Việt Nam</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="B" /> B. Ngày thương binh toàn quốc</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="C" /> C. Ngày Thương binh - Liệt sỹ</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="D" /> D. Ngày Thương binh - Liệt sỹ toàn quốc</p>
                        `;
                        break;
                    case 3:
                        ques = `
                        <p style="font-weight: bold;">3. Đâu là văn bản pháp quy đầu tiên khẳng định vị trí quan trọng của công tác thương binh, liệt sỹ và sự quan tâm của Đảng, Nhà nước đến thương binh, bệnh binh và gia đình liệt sỹ?</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="A" /> A. Sắc lệnh số 20/SL “Quy định chế độ hưu bổng, thương tật và tiền tuất tử sĩ”</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="B" /> B. Sắc lệnh số 22/SL “Quy định chế độ hưu bổng, thương tật và tiền tuất tử sĩ”</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="C" /> C. Sắc lệnh số 20/SL “Quy định chế độ hưu bổng và tiền tuất tử sĩ”</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="D" /> D. Sắc lệnh số 20/SL “Quy định chế độ hưu bổng và tiền tuất tử sĩ”</p>
                        `;
                        break;
                    case 4:
                        ques = `
<p style="font-weight: bold;">4. Tượng đài Mẹ Việt Nam Anh hùng lớn nhất nước ta nằm ở đâu? :</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="A" /> A. Tỉnh Bình Thuận</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="B" /> B. Tỉnh Quảng Nam</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="C" /> C. Tỉnh Quảng Bình</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="D" /> D. Tỉnh Ninh Thuận</p>
                        `;
                        break;
                    case 5:
                        ques = `
                        <p style="font-weight: bold;">5. Thân nhân liệt sỹ gồm những ai?</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="A" /> A. Cha đẻ, mẹ đẻ, vợ hoặc chồng, con đẻ, người có công nuôi liệt sĩ.</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="B" /> B. Cha đẻ, mẹ đẻ, vợ hoặc chồng, con (con đẻ, con nuôi).</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="C" /> C. Cha đẻ, mẹ đẻ, vợ hoặc chồng, con, người có công nuôi liệt sĩ.</p>
                        <p><input type="radio" name="result-radio" class="result-radio" value="D" /> D. Cha đẻ, mẹ đẻ, vợ hoặc chồng, con (con đẻ, con nuôi), người có công nuôi liệt sĩ.</p>
                        `;
                        break;
                }
                btnStart.setAttribute("disabled", "disabled");
                btnConfirm.removeAttribute("disabled");
                displayConfirm.style.display = 'block';


            }
            msg.innerHTML = `Bạn đã quay vào ô: ${txt}`;

            if (txt == 'Nến ngẫu nhiên') {
                PlayRandom();
                if (numberWheel != 0) {
                    btnStart.removeAttribute("disabled");
                }
            }
            else {
                let k = 'Câu hỏi số ' + ranques;
                if (txt != k)
                    btnStart.removeAttribute("disabled");
                qus.innerHTML = ques;
                var d = new Date();
                var day = d.getDate();
                var month = d.getMonth() + 1;
                var year = d.getFullYear();
                var hours = d.getHours() + 1;
                var mins = d.getMinutes() + 1;
                var secs = d.getSeconds() + 1;
                var nowdate = day + '-' + month + '-' + year + ' ' + hours + ':' + mins + ':' + secs;
                let s = `<p>Lần ${n1}: ${txt} (${nowdate})</p>`;
                let s1 = `Lần ${n1}: ${txt} (${nowdate}); `;
                resSave = resSave + s;
                localSave = localSave + s1;
                SaveLocal();
                save.innerHTML = resSave;
            }
            numWheel.innerHTML = `Số lượt quay: ${n2}`;
            if (n2 == 0) {
                btnStart.setAttribute("disabled", "disabled");
            }
        }, timer);
    };

    btnConfirm.addEventListener('click', () => {
        getResult(ranques);
        if (numberWheel != 0) {
            btnStart.removeAttribute("disabled");
        }
    });

    const SaveLocal = () => {
        let kt = 0;
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        if (students.length > 0) {
            students.forEach((item, index) => {
                if (item.id == stt) {
                    item.ketqua = localSave;
                    item.socautraloidung = quesright;
                    localStorage.setItem('students', JSON.stringify(students));
                    kt = 1;
                }
            });
            if (kt == 0) {
                let namestu = document.getElementById('name-play').value;
                const stu = {
                    id: stt,
                    name: namestu,
                    ketqua: localSave,
                    socautraloidung: quesright,
                }
                students.push(stu);
                localStorage.setItem('students', JSON.stringify(students));
            }
        }
        else {
            let namestu = document.getElementById('name-play').value;
            const stu = {
                id: stt,
                name: namestu,
                ketqua: localSave,
                socautraloidung: quesright,
            }
            students.push(stu);
            localStorage.setItem('students', JSON.stringify(students));
        }
    };

    const showTxtGiftRandom = (txt) => {
        setTimeout(() => {
            isRotatingRandom = false;
            msgRandom.innerHTML = `Chúc mừng bạn nhận được: ${txt}`;
            scrore = scrore + 30;
            txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
            btnConfirmRandom.removeAttribute("disabled");
            btnConfirmRandom.addEventListener('click', () => {
                getResultRandom(txt, count - 1);
            });
        }, timer);
    };

    let audio = new Audio('./am-thanh-vong-quay-may-man-ngan-www_tiengdong_com.mp3');
    const PlayRandom = () => {
        document.getElementById('over').style.display = 'block';
    };

    const start = () => {
        isRotating = true;
        msg.innerHTML = ``;
        qus.innerHTML = ``;
        resText.innerHTML = ``;
        txtScore.innerHTML = ``;
        numberWheel = numberWheel - 1;
        if (numberWheel == 0) {
            btnStart.setAttribute("disabled", "disabled");
        }
        if (scrore >= 9) {
            audio = new Audio('./LinhThiengVietNam-VuThangLoi.mp3');
            audio.play();
            document.getElementById('start_video').style.display = 'flex';
            document.getElementById('start_video').style.alignItems = 'center';
            $('.video-tx').play();
        }
        else {
            audio.play();
        }
        const random = Math.random();
        const gift = getGift(random);

        currentRotate1 += 360 * 10;
        rotatewheel(currentRotate1, gift.index);
        if (gift.txtName == 'Thêm lượt') {
            numberWheel = numberWheel + 1;
        }
        showTxtGift(gift.txtName, count, numberWheel);
        displayConfirm.style.display = 'none';
        count++;
    };

    const startRandom = () => {
        isRotatingRandom = true;
        msgRandom.innerHTML = ``;
        audio.play();
        const random = Math.random();
        const gift = getGiftRandom(random);

        currentRotateRandom += 360 * 10;
        rotatewheelRandom(currentRotateRandom, gift.index);
        showTxtGiftRandom(gift.txtName);
    };

    btnStart.addEventListener('click', () => {
        !isRotating && start();
        btnStart.setAttribute("disabled", "disabled");
    });

    btnStartRandom.addEventListener('click', () => {
        !isRotatingRandom && startRandom();
        btnStartRandom.setAttribute("disabled", "disabled");
    });

    const getResult = (res) => {
        btnConfirm.setAttribute("disabled", "disabled");
        const radioButtons = document.querySelectorAll('input[name="result-radio"]');
        let val;
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                val = radioButton.value;
                break;
            }
        }
        console.log("Cau random: " + res);
        switch (res) {
            case 1:
                if (val == 'C') {
                    resText.innerHTML = `Câu trả lời ĐÚNG`;
                    scrore = scrore + 3;
                    txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                    quesright = quesright + 1;
                    numQues.innerHTML = `Số câu trả lời đúng: ${quesright}`;
                    console.log(3);
                } else
                    resText.innerHTML = `Câu trả lời SAI`;
                scrore = scrore + 0;
                txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                break;
            case 2:
                if (val == 'B') {
                    resText.innerHTML = `Câu trả lời ĐÚNG`;
                    scrore = scrore + 3;
                    txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                    quesright = quesright + 1;
                    numQues.innerHTML = `Số câu trả lời đúng: ${quesright}`;
                    console.log(2);
                } else
                    resText.innerHTML = `Câu trả lời SAI`;
                scrore = scrore + 0;
                txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                break;
            case 3:
                if (val == 'A') {
                    resText.innerHTML = `Câu trả lời ĐÚNG`;
                    scrore = scrore + 3;
                    txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                    quesright = quesright + 1;
                    numQues.innerHTML = `Số câu trả lời đúng: ${quesright}`;
                    console.log(1);
                } else
                    resText.innerHTML = `Câu trả lời SAI`;
                scrore = scrore + 0;
                txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                break;
            case 4:
                if (val == 'C') {
                    resText.innerHTML = `Câu trả lời ĐÚNG`;
                    scrore = scrore + 3;
                    txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                    quesright = quesright + 1;
                    numQues.innerHTML = `Số câu trả lời đúng: ${quesright}`;
                    console.log(2);
                } else
                    resText.innerHTML = `Câu trả lời SAI`;
                scrore = scrore + 0;
                txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                break;
            case 5:
                if (val == 'D') {
                    resText.innerHTML = `Câu trả lời ĐÚNG`;
                    scrore = scrore + 3;
                    txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                    quesright = quesright + 1;
                    numQues.innerHTML = `Số câu trả lời đúng: ${quesright}`;
                    console.log(4);
                } else
                    resText.innerHTML = `Câu trả lời SAI`;
                scrore = scrore + 0;
                txtScore.innerHTML = `Số nến đã được thắp: ${scrore}`;
                break;
            default:
                break;
        }
        SaveLocal();
    };

    const getResultRandom = (txt, n1) => {
        document.getElementById('over').style.display = 'none';
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var hours = d.getHours() + 1;
        var mins = d.getMinutes() + 1;
        var secs = d.getSeconds() + 1;
        var nowdate = day + '-' + month + '-' + year + ' ' + hours + ':' + mins + ':' + secs;
        let s = `<p>Lần ${n1}: Nến ngẫu nhiên (${txt}) (${nowdate})</p>`;
        let s1 = `Lần ${n1}: Nến ngẫu nhiên (${txt}) (${nowdate}); `;
        resSave = resSave + s;
        localSave = localSave + s1;
        SaveLocal();
        save.innerHTML = resSave;
        if (numberWheel != 0) {
            btnStart.removeAttribute("disabled");
        }
    };

    renderItem();
    renderItemRandom();
})();

