document.addEventListener('DOMContentLoaded', () => {

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');

    fetch(imgUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const imageArray = Object.values(data)[0];

            for (let i = 0; i < imageArray.length; i++) {
                const img = document.createElement('img');
                img.src = imageArray[i];
                imageContainer.appendChild(img);
            }
        })
    
    fetch(breedUrl)
        .then((response) => response.json())
        .then(function(data) {
            const dogBreedsObject = Object.values(data)[0];

            for (const key in dogBreedsObject) {
                if (dogBreedsObject[key].length === 0) {
                    const breedEntry = document.createElement('li');
                    breedEntry.textContent = key;
                    breedList.appendChild(breedEntry);
                } else {
                    for (const element of dogBreedsObject[key]) {
                        const breedEntry = document.createElement('li');
                        breedEntry.textContent = `${element} ${key}`;
                        breedList.appendChild(breedEntry);
                    }
                }
            }
            const lis = document.querySelectorAll('li');
            for (let i = 0; i < lis.length; i++) {
                lis[i].addEventListener('click', () => {
                    console.log('I have been clicked')
                    lis[i].style.color = 'red';
                }) 
            }

            const dropdown = document.getElementById('breed-dropdown');
            dropdown.addEventListener('change', () => {
                const filterValue = dropdown.value;
                for (let i = 0; i < lis.length; i++) {
                    lis[i].hidden = false;
                }

                for (let i = 0; i < lis.length; i++) {
                    if (lis[i].textContent[0] !== filterValue) {
                        lis[i].hidden = true;
                    }
                }
            })
        })
    
})
