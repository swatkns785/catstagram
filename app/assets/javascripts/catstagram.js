$(document).ready(function() {
  $('[data-post-id]').on('submit', '[data-meow-button="create"]', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      dataType: "json",
      success: function(data) {

        var meow = data.meow
        var count = data.count

        // Create the String version of the form action
        action = '/posts/' + meow.post_id + '/meows/' + meow.id;

        // Create the new form
        $newForm = $('<form>').attr({
          action: action,
          method: 'delete',
          'data-meow-button': 'delete'
        });

        // Create the new submit input
        $meowButton = $('<input>').attr({type: 'submit', value: 'Remove Meow'});

        // Append the new submit input to the new form
        $newForm.append($meowButton);

        // Replace the old create form with the new remove form
        $form.replaceWith($newForm);

        var tense = checkTense(count);

        updateMeows(meow.post_id, count, tense);
      }
    });
  });

  $('[data-post-id]').on('submit', '[data-meow-button="delete"]', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "DELETE",
      url: $form.attr('action'),
      dataType: "json",
      success: function(count) {
        // Find the parent wrapper div so that we can use its data-post-id
        $post = $form.closest('[data-post-id]');

        // Create the String version of the form action
        action = '/posts/' + $post.data('post-id') + '/meows';

        // Create the new form for creating a Meow
        $newForm = $('<form>').attr({
          action: action,
          method: 'post',
          'data-meow-button': 'create'
        });

        // Create the new submit input
        $meowButton = $('<input>').attr({type: 'submit', value: 'Meow'});

        // Append the new submit input to the new form
        $newForm.append($meowButton);

        // Replace the old create form with the new remove form
        $form.replaceWith($newForm);

        var tense = checkTense(count);

        updateMeows($post.data('post-id'), count, tense);
      }
    });
  });

  function checkTense(count) {
    if (count === 1) {
      return 'Meow';
    } else {
      return 'Meows';
    }
  }

  function updateMeows (postId, count, tense) {
    $('[data-meows-count="' + postId + '"]').html(count + ' ' + tense);
  }
});
