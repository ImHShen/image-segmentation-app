// 获取元素
const fileInput = document.getElementById('file-input');
const dragDropArea = document.getElementById('drag-drop-area');
const thumbnailPreview = document.getElementById('thumbnail-preview');
const processButton = document.getElementById('process-button');

// 处理文件选择
fileInput.addEventListener('change', (event) => {
    handleFiles(event.target.files);
});

// 处理拖拽进入事件
dragDropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragDropArea.classList.add('dragover');
});

// 处理拖拽离开事件
dragDropArea.addEventListener('dragleave', () => {
    dragDropArea.classList.remove('dragover');
});

// 处理文件放下事件
dragDropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dragDropArea.classList.remove('dragover');
    handleFiles(event.dataTransfer.files);
});

// 处理文件的函数
function handleFiles(files) {
    // 清除之前的预览和错误信息
    thumbnailPreview.innerHTML = '';
    clearErrorMessages();

    let validFiles = 0;
    for (let file of files) {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            displayErrorMessage(`${file.name} 不是支持的图像文件。`);
            continue;
        }
        // 验证文件大小（限制为5MB）
        if (file.size > 5 * 1024 * 1024) {
            displayErrorMessage(`${file.name} 超过了5MB的大小限制。`);
            continue;
        }
        // 显示有效文件的缩略图
        validFiles++;
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        thumbnailPreview.appendChild(img);
    }
    // 根据是否有有效文件来启用或禁用处理按钮
    processButton.disabled = validFiles === 0;
    processButton.classList.toggle('enabled', validFiles > 0);
}

// 显示错误信息的函数
function displayErrorMessage(message) {
    let errorContainer = document.getElementById('error-messages');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'error-messages';
        errorContainer.style.color = 'red';
        errorContainer.style.marginTop = '10px';
        document.getElementById('upload-container').appendChild(errorContainer);
    }
    errorContainer.innerHTML += `<p>${message}</p>`;
}

// 清除错误信息的函数
function clearErrorMessages() {
    const errorContainer = document.getElementById('error-messages');
    if (errorContainer) {
        errorContainer.innerHTML = '';
    }
}

// 处理按钮点击事件
processButton.addEventListener('click', initiateProcessing);

function initiateProcessing() {
    // 隐藏之前的错误信息
    clearErrorMessages();
    // 开始处理逻辑
    startProcessingAnimation();
}
// 模拟处理并更新进度条的函数
function startProcessingAnimation() {
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressFill = document.getElementById('progress-fill');
    let progress = 0;

    // 显示进度条
    progressBarContainer.style.display = 'block';

    // 模拟处理进度
    const processingInterval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(processingInterval);
            processButton.innerHTML = '处理图像';
            processButton.disabled = false;
            showCompletionMessage(true); // 处理成功，传递false表示失败
        } else {
            progress += 10; // 增加进度
            progressFill.style.width = progress + '%';
            progressFill.textContent = progress + '%';
            processButton.innerHTML = `处理中... ${progress}%`;
        }
    }, 500);
}

// 显示完成信息的函数
function showCompletionMessage(isSuccess) {
    const banner = document.getElementById('notification-banner');
    const icon = document.getElementById('notification-icon');
    const message = document.getElementById('notification-message');
    const closeBtn = document.getElementById('notification-close');

    // 根据成功或失败设置横幅样式和内容
    if (isSuccess) {
        banner.className = 'success';
        icon.textContent = '✅';
        message.textContent = '图像处理成功完成！';
    } else {
        banner.className = 'failure';
        icon.textContent = '❌';
        message.textContent = '图像处理失败。请重试。';
    }

    // 显示横幅
    banner.style.top = '0';

    // 点击关闭按钮时隐藏通知
    closeBtn.addEventListener('click', () => {
        banner.style.top = '-100px';
    });
}
// 在处理过程中添加旋转器图标
function startProcessingAnimation() {
    // ...之前的代码...
    // 显示旋转器图标
    processButton.innerHTML = '处理中... <span class="spinner"></span>';
    processButton.disabled = true;

    // 处理完成后
    clearInterval(processingInterval);
    processButton.innerHTML = '处理图像';
    processButton.disabled = false;
    // ...之前的代码...
}
