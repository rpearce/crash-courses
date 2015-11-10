var pets = [
  { name: 'Bailey' , type: 'English Bulldog'   , gender: 'male'   },
  { name: 'Bella'  , type: 'Golden Retriever'  , gender: 'female' },
  { name: 'Lucy'   , type: 'Corgi'             , gender: 'female' },
  { name: 'Max'    , type: 'French Bulldog'    , gender: 'male'   },
  { name: 'Charlie', type: 'Pomeranian'        , gender: 'male'   },
  { name: 'Molly'  , type: 'Saint Bernard'     , gender: 'female' },
  { name: 'Daisy'  , type: 'Basset Hound'      , gender: 'female' },
  { name: 'Maggie' , type: 'Pug'               , gender: 'female' },
  { name: 'Buddy'  , type: 'Labrador Retriever', gender: 'male'   }
];

var rootNode = document.querySelector('[data-js="pets"]');

renderPets();

function renderPets() {
  /*
   * Method 1: `document.createElement` and `forEach`
   *           and multiple DOM mutations
   */
  //pets.forEach(buildPetMarkup);

  //function buildPetMarkup(pet) {
  //  var rowNode = document.createElement('tr'),
  //      nameNode = document.createElement('td'),
  //      typeNode = document.createElement('td'),
  //      genderNode = document.createElement('td');

  //  nameNode.innerText = pet.name;
  //  typeNode.innerText = pet.type;
  //  genderNode.innerHTML = pet.gender === 'male' ? '&#9794;' : '&#9792;';
  //  genderNode.className = 'align--center';

  //  [nameNode, typeNode, genderNode].forEach(function(node) {
  //    rowNode.appendChild(node);
  //  });

  //  rootNode.appendChild(rowNode);
  //}

  /*
   * Method 2: string template and `forEach`
   *           and building an Array
   *           and 1 DOM mutation
   */
  //var petsMarkup = [];
  //pets.forEach(buildPetMarkup);

  //function buildPetMarkup(pet) {
  //  var genderSymbol = pet.gender === 'male' ? '&#9794;' : '&#9792;';
  //  var template = '<tr>' +
  //    '<td>' + pet.name + '</td>' +
  //    '<td>' + pet.type + '</td>' +
  //    '<td class="align--center">' + genderSymbol + '</td>' +
  //    '</tr>';
  //  petsMarkup.push(template);
  //}

  //rootNode.innerHTML = petsMarkup.join('');

  /*
   * Method 3: string template and `forEach`
   *           and building a String
   *           and 1 DOM mutation
   */
  //var petsMarkup = '';
  //pets.forEach(buildPetMarkup);

  //function buildPetMarkup(pet) {
  //  var genderSymbol = pet.gender === 'male' ? '&#9794;' : '&#9792;';
  //  var template = '<tr>' +
  //    '<td>' + pet.name + '</td>' +
  //    '<td>' + pet.type + '</td>' +
  //    '<td class="align--center">' + genderSymbol + '</td>' +
  //    '</tr>';
  //  petsMarkup += template;
  //}

  //rootNode.innerHTML = petsMarkup;

  /*
   * Method 4: string template and `map`
   *           and building an Array
   *           and 1 DOM mutation
   */
  rootNode.innerHTML = pets.map(buildPetMarkup).join('');

  function buildPetMarkup(pet) {
    var genderSymbol,
        template;

    genderSymbol = pet.gender === 'male' ? '&#9794;' : '&#9792;';
    template = '<tr>' +
      '<td>' + pet.name + '</td>' +
      '<td>' + pet.type + '</td>' +
      '<td class="align--center">' + genderSymbol + '</td>' +
      '</tr>';
    return template;
  }
}




/*
 * Form Listener
 */
var form = document.querySelector('[data-js="petForm"]');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  var el = e.target,
      name = el.querySelector('[name="pet[name]"]').value,
      type = el.querySelector('[name="pet[type]"]').value,
      gender = el.querySelector('[name="pet[gender]"]:checked').value,
      pet = {
        name: name,
        type: type,
        gender: gender
      };
  pets.unshift(pet);
  renderPets();
});
