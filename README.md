# Siili Recipes API

Simple REST service providing working api for demo applications to-be-written by interviewed front-end developers.

#### installing dependencies

```
npm install
```

#### testing

```
npm test
```

#### runnning service

```
npm start
```

## API

#### GET /
#### GET /api/recipes/
#### POST /api/recipes/

{
    "title":"Szaszłyki a’la kebab",
    "minutes": "20",
    "description":"Mięso, cebulę i paprykę pokrój w grubą kostkę, a boczek w kostkę 2 cm x 0,5 cm. Fix Knorr (duża saszetka) wymieszaj z olejem i zamarynuj mięso. Kawałki mięsa nakładaj na patyki na przemian z warzywami. Szaszłyki obsmaż na patelni z obu stron a następnie piecz w piekarniku nagrzanym do 240 stopni przez 30 minut. Sos czosnkowy (mała saszetka) wymieszaj z jogurtem. Podawaj z szaszłykami.Moim zdaniem szaszłyki można piec w nieco niższej temperaturze, ale trochę dłużej. Mięso będzie bardziej soczyste. Moja rada jak uzyskać chrupiące warzywa i aromatyczne mięso to marynowanie składników dzień wcześniej i pozostawienie w lodówce do momentu gotowania. Moim kulinarnym zaskoczeniem jest cebula marynowana po prostu w occie winnym. Daje wyjątkowy smak na grillu. Paprykę natomiast warto umieszczać w środku szaszłyka, tak aby mogła przyjąć smak mięsa i przypraw. Koniec i początek szpady szaszłykowej zarezerwujcie dla boczku. Nasz Knorr Fix Kebab z dipem czosnkowym to nieskomplikowany pomysł na nadchodzący sezon grillowy. Musztardę i keczup wszyscy dobrze znamy. Teraz czas na dip czosnkowy. Wspominałem już o polędwiczkach wieprzowych. Może trochę zbyt nadużywane w ostatnich czasach, ale moim zdaniem to bardzo dobre mięso. Chude, miękkie, dobrze komponuje się z wieloma dodatkami. No i, co szczególnie ważne, bardzo łatwe do przygotowania. Na domowy obiad w ciągu tygodnia polecam eskalopki z mozzarellą.",
    "ingredients":[
        {"name":"mięso wieprzowe", "unit":"g", "quantity":400, "comment":"np. karkówka"},
        {"name":"Fix Knorr Kebab z dipem czosnkowym"},
        {"name":"boczek wędzony", "unit":"g", "quantity":200},
        {"name":"papryka", "quantity":1},
        {"name":"cebula", "quantity":2},
        {"name":"olej", "unit":"łyżka", "quantity":4},
        {"name":"patyczki", "comment":"kilka sztuk"}
     ]
}

#### GET /api/recipies/{ID}
#### PUT /api/recipies/{ID}
#### DELETE /api/recipies/{ID}
