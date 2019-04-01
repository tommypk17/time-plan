<?php require('../standard/header.html'); ?>
<!--<link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel = "stylesheet">-->
<link href = "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/css/jquery-ui.css" rel = "stylesheet">
<!--<script src = "https://code.jquery.com/jquery-1.10.2.js"></script>-->
<script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.js"></script>
<!--<script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>-->
<script src = "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>

<script src="../manage/manage.js"></script>
<link href="../manage/manage.css" type="text/css" rel="stylesheet">


<main class="main">
	<section id="sec1">
		<div>
			<h2>Select an action</h2>
			<label for="selection">Action: </label>
			<select name="selection">
				<option value="create">Create</option>
				<option value="update">Update</option>
			</select>
		</div>
		<a id="select-option" class="button">Select</a>
	</section>
	<hr/>
	<section id="sec2"><h2>No Action Selected!</h2></section>
	<hr/>
	<section id="sec3"><h2>No Option Selected!</h2></section>
</main>
<?php require('../standard/footer.html'); ?>
