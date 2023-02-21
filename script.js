'use strict';
var data = document.querySelector('.text-code');
var dataArray =  [];
var dropdownItems = document.querySelector('.dropdwon_list');

function empty(element){
    element.innerHTML = "";
}
function toggle(item){
    if(item.classList.contains('hidden'))item.classList.remove('hidden');
    else item.classList.add('hidden')
}

function searchInput(target){
    for(let item of document.querySelectorAll('.dropdown-item')){
        
        var chart = item.textContent.toLowerCase();
        var found = target.match(chart);
        item.classList.add('hidden');
        if(found !== null){
           
            if(found.input.toLowerCase() === chart){
                toggle(item);
            }

            if(found.input !== chart){
                console.log('NOT EQUAL: '+item);
                toggle(item);
            }
        }

        if(target === ''){
            console.log('EMPTY: '+item);
            toggle(item);
        }
        
    }
}

async function loadTags(){
    const response = await fetch('./tags.json');
    const tags = await response.json();
    dataArray.length = 0;
    dataArray.push(tags);
}

loadTags();

document.addEventListener('DOMContentLoaded', function(){
    
    empty(dropdownItems);
    window.addEventListener('load', function(){
        dataArray[0].forEach(element => {
            let li = document.createElement('li');
            li.classList.add('dropdown-item');
            li.innerHTML = element.name;
            dropdownItems.append(li);
       }); 
    }, false);
    

    var clean = document.querySelector('#clean-code');

    clean.addEventListener('click', function(){
        var text_field = document.querySelector('.text-code');
        empty(text_field);
    });
    data.addEventListener('keypress', (event) => {
        
        var target = event.target.textContent;
        let regex = /<.*?>/;
        let regexClose = /<.*?>/;
        var foundTag = target.match(regex);
        var foundCloseTag = target.match(regexClose);
        console.log(foundTag, foundCloseTag);
       
    });
    
    var set_code = document.querySelector('#set-code');
    var content = document.querySelector('.model');
    empty(content);
    set_code.addEventListener('click', function(){
       var structure = document.querySelector('.text-code').textContent;
        content.innerHTML = structure;
    }); 

    window.addEventListener('load', function(){
        var dropdownItem = document.querySelectorAll('.dropdown-item');
        
        for (let dropdown of dropdownItem){
            dropdown.addEventListener('click', function(){
                dataArray[0].forEach(element => {
                    if(this.textContent === element.name){
                        let textarea = document.querySelector('.text-code');
                        if(element.close_tag !== undefined){
                            textarea.append(element.open_tag +  element.close_tag);
                        }else{
                            textarea.append(element.open_tag);
                        }
                          
                    } 
                });   
            });
        }

        var dropdown_search = document.querySelector('.s'); 
        dropdown_search.addEventListener('keypress', (event) => {
            var target = event.target.value;
            searchInput(target);
        });
    }, false); 

});





