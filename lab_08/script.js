const folderStructure = [
    {
        "Films": [
            "Iron Man.avi",
            {
                "Fantasy": [
                    "The Lord of the Rings.avi",
                    {
                        "New folder 1": []
                    }
                ]
            }
        ]
    },
    {
        "Documents": []
    }
];

function clearSelection() {
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
}

function createFolderTree(structure, parent) {
    const ul = document.createElement('ul');
    
    structure.forEach(item => { 
        if (typeof item === 'string') {
            const li = document.createElement('li');
            li.classList.add('file');
            li.textContent = item;
            
            li.addEventListener('click', function (event) {
                clearSelection();
                li.classList.add('selected');
                event.stopPropagation();
            });

            ul.appendChild(li);
        } else {
            for (const key in item) {
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                summary.textContent = key;
                
                summary.addEventListener('click', function (event) {
                    clearSelection();
                    summary.classList.add('selected');
                    event.stopPropagation();
                });

                details.appendChild(summary);
                const sublist = createFolderTree(item[key], details);
                details.appendChild(sublist);
                ul.appendChild(details);
            }
        }
    });

    parent.appendChild(ul);
    return ul;
}

const fileExplorer = document.getElementById('file-explorer');
createFolderTree(folderStructure, fileExplorer);