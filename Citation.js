let button = document.querySelector('button');
let citation = document.querySelector('#citation');
let auteur = document.querySelector('#auteur');

let dernier = 0;
let nombreAleatoire=0;

let calculateAngle = function(e, item, parent) {
  let dropShadowColor = `rgba(0, 0, 0, 0.3)`
  // If the button has a data-filter-color attribute, then use this for the shadow's color
  if(parent.getAttribute('data-filter-color') !== null) {
      dropShadowColor = parent.getAttribute('data-filter-color');
  }

  // If the button has a data-custom-perspective attribute, then use this as the perspective.
  if(parent.getAttribute('data-custom-perspective') !== null) {
      parent.style.perspective = `${parent.getAttribute('data-custom-perspective')}`
  }

  // Get the x position of the users mouse, relative to the button itself
  let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
  // Get the y position relative to the button
  let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

  // Calculate half the width and height
  let halfWidth  = item.getBoundingClientRect().width / 2;
  let halfHeight = item.getBoundingClientRect().height / 2;

  // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
  // Changing these numbers will change the depth of the effect.
  let calcAngleX = (x - halfWidth) / 6;
  let calcAngleY = (y - halfHeight) / 4;

  // Set the items transform CSS property
  item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.15)`;
      
  // And set its container's perspective.
  parent.style.perspective = `${halfWidth * 2}px`
  item.style.perspective = `${halfWidth * 3}px`

  // Reapply this to the shadow, with different dividers
  let calcShadowX = (x - halfWidth) / 3;
  let calcShadowY = (y - halfHeight) / 3;
      
  // Add a filter shadow - this is more performant to animate than a regular box shadow.
  item.style.filter = `drop-shadow(${-calcShadowX}px ${calcShadowY}px 15px ${dropShadowColor})`;
}

  document.querySelectorAll('.nouveau').forEach(function(item) {
    // Add on mouseenter
    item.addEventListener('mouseenter', function(e) {
        calculateAngle(e, this.querySelector('span'), this);
    });
    // Add on mousemove
    item.addEventListener('mousemove', function(e) {
        calculateAngle(e, this.querySelector('span'), this);
    });

    // Reset everything on mouse leave
    item.addEventListener('mouseleave', function(e) {
        let dropShadowColor = `rgba(0, 0, 0, 0.3)`
        if(item.getAttribute('data-filter-color') !== null) {
            dropShadowColor = item.getAttribute('data-filter-color')
        }
        item.querySelector('span').style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
        item.querySelector('span').style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
    });
})


let citations = [
    ["La vie est un mystère qu'il faut vivre, et non un problème à résoudre.", "Gandhi"],
    ["Le plus grand risque est de ne prendre aucun risque.", "Mark Zuckerberg"],
    ["Méritez votre statut de leader chaque jour.", "Mickael Jordan"],
    ["Soyez le changement que vous voulez voir dans le monde.", "Gandhi"],
    ["A chaque fois que vous vous retrouvez du même côté que la majorité, il est temps de prendre du recul, et de réfléchir.", "Mark Twain"],
    ["Seulement ceux qui prendront le risque d’aller trop loin découvriront jusqu’où on peut aller.", "T.S Elliot"],
    ["Le succès c’est tomber sept fois, se relever huit.", "Proverbe japonais"],
    ["Dans vingt ans vous serez plus déçus par les choses que vous n’avez pas faites que par celles que vous avez faites. Alors sortez des sentiers battus. Mettez les voiles. Explorez. Rêvez. Découvrez.", "Mark Twain"],
    ["Si vous attendez pour agir, tout ce que vous gagnerez, avec le temps, c’est de l’âge.", "Brian Tracy"],
    ["Quand on concentre son attention sur un seul projet, l’esprit suggère constamment des idées et des améliorations qui lui échapperaient s’il était occupé avec plusieurs projets en même temps.", "P.T. Barnum"],
    ["Se dédier à faire tout ce que l’on peut pour aider les autres à obtenir ce qu’ils veulent, c’est la clé du succès.", "Brian Sher"],
    ["Si vous pensez que vous êtes trop petit pour avoir de l’impact, essayez d’aller au lit avec un moustique.", "Anita Roddick"],
    ["Ne jugez pas chaque jour sur ce que vous récoltez, mais sur les graines que vous semez.", "Robert Louis Stevenson"],
    ["L’action est la clé fondamentale de tout succès.", "Pablo Picasso"],
    ["Le succès, c’est se promener d’échecs en échecs tout en restant motivé.", "Winston Churchill"],
    ["Votre avenir est créé par ce que vous faîtes aujourd’hui, pas demain.", "Robert T. Kiyosaki"],
    ["Ne vous découragez pas, c’est souvent la dernière clef du trousseau qui ouvre la porte.", "Zig Ziglar"],
    ["Pour gagner votre vie, apprenez à l’école. Pour gagner une fortune, apprenez par vous-même.", "Brian Tracy"],
    ["Les gagnants trouvent des moyens, les perdants des excuses…", "F. D. Roosevelt"],
    ["Vous n’êtes jamais trop vieux pour vous fixer de nouveaux buts, ou rendre vos rêves réalité.", "C.S. Lewis"],
    ["Un pessimiste voit la difficulté dans chaque opportunité. Un optimiste voit une opportunité dans chaque difficulté.", "Winston Churchill"]
  ];



  function genererNombreEntier(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  
button.addEventListener('click', ()=>{
  do {
   nombreAleatoire = genererNombreEntier(citations.length)
   } while (nombreAleatoire==dernier)

   citation.textContent=citations[nombreAleatoire][0]
   auteur.textContent=citations[nombreAleatoire][1]
   dernier= nombreAleatoire;
})

  
