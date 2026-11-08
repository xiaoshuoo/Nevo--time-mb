loadJSON('data/categories.json', function(list) {
  let html = '';
  for (let i = 0; i < list.length; i++) {
    let cls = 'category';
    if (i % 2 === 1) {
      cls = cls + ' category--reverse';
    }
    html += '<div class="' + cls + '">' +
      '<img src="' + list[i].image + '" alt="' + list[i].alt + '" style="object-position: ' + list[i].position + '">' +
      '<div class="category-text"><h2>' + list[i].title + '</h2>' +
      '<a class="btn-outline" href="#">Смотреть все</a></div></div>';
  }
  document.getElementById('categories').innerHTML = html;
});

loadJSON('data/reasons.json', function(list) {
  let html = '';
  for (let i = 0; i < list.length; i++) {
    html += '<div class="reason"><div class="reason-icon"><img src="' + list[i].icon + '" alt=""></div>' +
      '<h3>' + list[i].title + '</h3><p>' + list[i].text + '</p></div>';
  }
  document.getElementById('reasons-list').innerHTML = html;
});
