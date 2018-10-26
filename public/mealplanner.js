'use strict';

$(document).ready(function () {

  // getting all foods
  var foods = [];
  const url = 'http://[::1]:3000/food';
  $.get(url, function (data, status) {
    if (status == "success") {
      foods = data;
    }
  });

  // clicking on buttons
  $("#fruit-button").on('click', function () {
    $(".fruit").toggle();
    $(".grain").hide();
    $(".milk").hide();
    $(".meat").hide();

    generateFoodTable(sortFoods(foods)[0], "fruit");
  });

  $("#grain-button").on('click', function () {
    $(".grain").toggle();
    $(".fruit").hide();
    $(".milk").hide();
    $(".meat").hide();

    generateFoodTable(sortFoods(foods)[1], "grain");
  });


  $("#milk-button").on('click', function () {
    $(".milk").toggle();
    $(".fruit").hide();
    $(".grain").hide();
    $(".meat").hide();

    generateFoodTable(sortFoods(foods)[2], "milk");
  });

  $("#meat-button").on('click', function () {
    $(".meat").toggle();
    $(".fruit").hide();
    $(".grain").hide();
    $(".milk").hide();

    generateFoodTable(sortFoods(foods)[3], "meat");
  });

  function generateFoodTable(fs, id) {
    var table;
    if (id == "fruit") {
      table = document.getElementById("fruit-display");
      $("#fruit-display tr").remove();
    }
    else if (id == "grain") {
      table = document.getElementById("grain-display");
      $("#grain-display tr").remove();
    }
    else if (id == "milk") {
      table = document.getElementById("milk-display");
      $("#milk-display tr").remove();
    }
    else if (id == "meat") {
      table = document.getElementById("meat-display")
      $("#meat-display tr").remove();
    }

    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    // Add some bold text in the new cell:
    cell1.innerHTML = "<b>Name</b>";
    cell2.innerHTML = "<b>Amount</b>";
    cell3.innerHTML = "<b>Description</b>";

    for (var i = 0; i < fs.length; i++) {
      var row = table.insertRow(i + 1);

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = fs[i].name;
      cell2.innerHTML = fs[i].amount + " " + fs[i].unit;
      cell3.innerHTML = fs[i].description;
    }
  }

  function deleteFood(food) {
    var foodurl = url + "/" + food.id;
    $.ajax({
      url: foodurl,
      type: 'DELETE',
      success: function (result) {
        $.get(url, function (data, status) {
          if (status == "success") {
            foods = data;
          }
        });
      }
    });
    switch (food.category.toLowerCase().substring(0, 2)) {
      case 'fr':
        generateFoodTable(sortFoods(foods)[0], "fruit");
        break;
      case 'gr':
        generateFoodTable(sortFoods(foods)[1], "grain");
        break;
      case 'mi':
        generateFoodTable(sortFoods(foods)[2], "milk");
        break;
      case 'me':
        generateFoodTable(sortFoods(foods)[3], "meat");
        break;
    }
  }

  function sortFoods(foods) {
    var fruits = []
    var grains = []
    var milks = []
    var meats = []

    for (var i = 0; i < foods.length; i++) {
      if (foods[i].category == "Fruits and Vegetables")
        fruits.push(foods[i]);
      else if (foods[i].category == "Grain Products")
        grains.push(foods[i]);
      else if (foods[i].category == "Milk and Alternatives")
        milks.push(foods[i]);
      else if (foods[i].category == "Meat and Alternatives")
        meats.push(foods[i]);
    }

    return [fruits, grains, milks, meats];
  }

  function getFoodsFromMeal(mealId, foods) {
    var food = []
    for (var i = 0; i < foods.length; i++) {
      if (foods[i].mealId == mealId)
        food.push(foods[i]);
    }
    return food;
  }

  $('#food-form').submit(function (e) {
    e.preventDefault();
    var name = document.forms["food-form"]["name"].value;
    var category = document.forms["food-form"]["category"].value;
    var description = document.forms["food-form"]["description"].value;
    var amount = parseInt(document.forms["food-form"]["amount"].value, 10);
    var units = document.forms["food-form"]["units"].value;

    console.log(name, category, description, amount, units);

    $.postJSON = function (url, data, callback) {
      return jQuery.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        'type': 'POST',
        'url': url,
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
      });
    };

    var data = {
      "id": 0,
      "name": name,
      "category": category,
      "description": description,
      "amount": amount,
      "unit": units
    }

    const url = 'http://[::1]:3000/food';

    if (!ifExists(name, amount)) {
      $.postJSON(url, data, function (data, status) {
        if (status == "success") {
          document.getElementById('done').innerHTML =
            data.name + " has been added to the fridge."
        }
        else
          document.getElementById('done').innerHTML = "Try again, " + data.name
            + " has not been added to the fridge."
      });
      $.get(url, function (data, status) {
        if (status == "success") {
          foods = data;
          console.log(foods);
          switch (category.toLowerCase().substring(0, 2)) {
            case 'fr':
              generateFoodTable(sortFoods(foods)[0], "fruit");
              break;
            case 'gr':
              generateFoodTable(sortFoods(foods)[1], "grain");
              break;
            case 'mi':
              generateFoodTable(sortFoods(foods)[2], "milk");
              break;
            case 'me':
              generateFoodTable(sortFoods(foods)[3], "meat");
              break;
          }
        }
      });
    }
    else {
      switch (category.toLowerCase().substring(0, 2)) {
        case 'fr':
          generateFoodTable(sortFoods(foods)[0], "fruit");
          break;
        case 'gr':
          generateFoodTable(sortFoods(foods)[1], "grain");
          break;
        case 'mi':
          generateFoodTable(sortFoods(foods)[2], "milk");
          break;
        case 'me':
          generateFoodTable(sortFoods(foods)[3], "meat");
          break;
      }
    }

    return false;
  });

  function ifExists(name, amount) {
    var duplicate = foods.slice();
    for (var i = 0; i < duplicate.length; i++) {
      if (duplicate[i].name.toLowerCase() == name.trim().toLowerCase()) {
        foods[i].amount += amount;
        if (foods[i].amount <= 0)
          deleteFood(foods[i]);
        return true;
      }
    }
    return false;
  }

  $("#add-food").on('click', function () {
    $("#food-adder").toggle();
    $(this).html($(this).html() == 'Show Food Adder/Remover' ? 'Hide Food Adder/Remover' : 'Show Food Adder/Remover');
  });

  function inFridge(name, amount) {
    for (var i = 0; i < foods.length; i++) {
      if (foods[i].name.toLowerCase() == name.trim().toLowerCase()) {
        if (parseInt(foods[i].amount, 10) < amount) {
          document.getElementById("enough").innerHTML = "Not enough.";
          return false;
        }
        return true;
      }
    }
    return false;
  }

  var mealFoods = []
  var mealFood = []
  $('#meal-planner').submit(function (e) {
    document.getElementById("enough").innerHTML = '';
    e.preventDefault();
    var name = document.forms["meal-planner"]["name"].value;
    var amount = parseInt(document.forms["meal-planner"]["amount"].value, 10);
    if (inFridge(name, amount)) {
      mealFoods.push(name);
      var food = findFoodByName(name);
      mealFood.push(food);
      food.amount -= amount;
      switch (food.category.toLowerCase().substring(0, 2)) {
        case 'fr':
          generateFoodTable(sortFoods(foods)[0], "fruit");
          break;
        case 'gr':
          generateFoodTable(sortFoods(foods)[1], "grain");
          break;
        case 'mi':
          generateFoodTable(sortFoods(foods)[2], "milk");
          break;
        case 'me':
          generateFoodTable(sortFoods(foods)[3], "meat");
          break;
      }
      var li = $('<li/>')
        .text(name + ": " + amount + " " + food.unit)
        .on("click", function () {
          $(this).remove()
          food.amount += amount;
        });
      $("#meal-foods").prepend(li);

    }
    else if (document.getElementById("enough").innerHTML == '')
      document.getElementById("enough").innerHTML = "Not in fridge.";

    return false;
  });

  function findFoodByName(name) {
    for (var i = 0; i < foods.length; i++) {
      if (foods[i].name.toLowerCase() == name.trim().toLowerCase()) {
        return foods[i];
      }
    }
  }

  var meals = []
  const mealurl = 'http://[::1]:3000/meal';
  $.get(mealurl, function (data, status) {
    if (status == "success") {
      meals = data;
      generateMealTable(meals);
    }
    else {
      generateMealTable(meals);
    }
  });

  $("#meal-specifications").submit(function (e) {
    e.preventDefault();
    var type = document.forms["meal-specifications"]["type"].value;
    var recipe = document.forms["meal-specifications"]["recipe"].value;

    $.postJSON = function (url, data, callback) {
      return jQuery.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        'type': 'POST',
        'url': url,
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
      });
    };

    var data = {
      "id": 0,
      "type": type,
      "recipe": recipe,
      "food": mealFood
    }

    if (mealFoods.length == 0)
      document.getElementById("created").innerHTML = "Meal has not been created. Please add food to the meal.";
    else {
      $.postJSON(mealurl, data, function (data, status) {
        if (status == "success") {
          document.getElementById("created").innerHTML = "Meal has been created.";
          $.get(mealurl, function (data, status) {
            if (status == "success") {
              meals = data;
              generateMealTable(meals);
            }
          });

          for (var i = 0; i < mealFood.length; i++) {
            if (mealFood[i].amount <= 0)
              deleteFood(mealFood[i]);
          }

          mealFood = []
          mealFoods = []
          document.getElementById("meal-foods").innerHTML = '';
        }
        else
          document.getElementById("created").innerHTML = "Meal has not been created.";
      });
    }
    return false;
  });

  function generateMealTable(meals) {
    var table = document.getElementById("meals");
    $("#meals tr").remove();

    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    // Add some bold text in the new cell:
    cell1.innerHTML = "<b>Type</b>";
    cell2.innerHTML = "<b>Foods</b>";
    cell3.innerHTML = "<b>Recipe</b>";

    for (var i = 0; i < meals.length; i++) {
      var row = table.insertRow(i + 1);

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = meals[i].type;
      for (var j = 0; j < meals[i].food.length; j++)
        cell2.innerHTML += meals[i].food[j].name + " ";
      cell3.innerHTML = meals[i].recipe;
    }
  }

});
