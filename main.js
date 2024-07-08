
let box_image = document.querySelector('.box-image');
let lable = document.querySelector('.lable-1');
let img = document.getElementById('img');
let uplode = document.getElementById('uplode');
let dowload = document.getElementById('dowload');
let reset = document.getElementById('reset');


window.onload = function (){
    box_image.style.display = 'none';
    dowload.style.display = 'none';
    reset.style.display = 'none';


    document.querySelectorAll('.container .filters ul li input[type="range"]').forEach(function(rangeInput) {
        updateBackground(rangeInput);
    });
};


document.querySelectorAll('.container .filters ul li input[type="range"]').forEach(function(rangeInput) {
    rangeInput.addEventListener('input', function() {
        let filters = '';
        document.querySelectorAll('.container .filters ul li input[type="range"]').forEach(function(input) {
            switch (input.id) {
                case 'grayscale':
                    filters += `grayscale(${input.value / 200}) `;
                    break;
                case 'brightness':
                    filters += `brightness(${input.value / 100}) `;
                    break;
                case 'contrast':
                    filters += `contrast(${input.value / 100}) `;
                    break;
                case 'blur':
                    filters += `blur(${input.value / 5}px) `;
                    break;
                case 'invert':
                    filters += `invert(${input.value / 500}) `;
                    break;
                case 'saturate':
                    filters += `saturate(${input.value / 100}) `;
                    break;
                case 'sepia':
                    filters += `sepia(${input.value / 300}) `;
                    break;
            }
        });

        img.style.filter = filters.trim();
        updateBackground(this);
    });
});


function updateBackground(rangeInput) {
    const value = rangeInput.value;
    rangeInput.style.background = `linear-gradient(to right, rgb(150, 76, 219) ${value / 900}%, white ${value / 1}%)`;
}


uplode.addEventListener('change', function() {
    box_image.style.display = 'block';  
    dowload.style.display = 'block';   
    reset.style.display = 'block';     


    
    img.src = ''; 
    img.style.filter = `
        grayscale(0)
        brightness(1)
        contrast(1)
        blur(0px)
        invert(0)
        saturate(1)
        sepia(0)
    `;

    
    document.getElementById('grayscale').value = 0;
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('blur').value = 0;
    document.getElementById('invert').value = 0;
    document.getElementById('saturate').value = 100;
    document.getElementById('sepia').value = 0;

    document.querySelectorAll('.container .filters ul li input[type="range"]').forEach(function(rangeInput) {
        updateBackground(rangeInput);
    });

    
    let reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;  
    };
    reader.readAsDataURL(uplode.files[0]);  
});


reset.addEventListener('click', function () {
    document.getElementById('grayscale').value = 0;
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('blur').value = 0;
    document.getElementById('invert').value = 0;
    document.getElementById('saturate').value = 100;
    document.getElementById('sepia').value = 0;
    
    
    img.style.filter = `
        grayscale(${document.getElementById('grayscale').value / 200})
        brightness(${document.getElementById('brightness').value / 100})
        contrast(${document.getElementById('contrast').value / 100})
        blur(${document.getElementById('blur').value / 100}px)
        invert(${document.getElementById('invert').value / 500})
        saturate(${document.getElementById('saturate').value / 100})
        sepia(${document.getElementById('sepia').value / 300})
    `;

    document.querySelectorAll('.container .filters ul li input[type="range"]').forEach(function(rangeInput) {
        updateBackground(rangeInput);
    });
});



let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');


canvas.style.display = 'none';
document.body.appendChild(canvas); 

function applyFiltersAndDownload() {
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.filter = img.style.filter;
    ctx.drawImage(img, 0, 0);

    let downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL();
    downloadLink.download = 'filtered_image.png';
    downloadLink.click();
}

dowload.addEventListener('click', function() {
    Promise.resolve().then(applyFiltersAndDownload);
});
