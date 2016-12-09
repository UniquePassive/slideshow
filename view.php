<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->

    <title>slideshow</title>

    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
    <main>
        <aside id="slide">
            <section id="content"></section>
            <section id="caption"></section>
        </aside>

        <aside id="actionbar"></aside>
    </main>

    <script src="js/lib/jquery-3.1.1.min.js"></script>
    <script src="js/lib/circle-progress.min.js"></script>
    <script src="js/slideshow-util.js"></script>
    <script src="js/slideshow.js"></script>
    <script>
        $(function() {
            slideShow = new SlideShow(
                $('#content'), 
                $('#caption'), 
                $('#actionbar')
            );

            $.get("slides/<?php echo $_GET['id'] ?>/pages.json", function(data) {
                slideShow.load("<?php echo $_GET['id'] ?>", JSON.parse(data));
                slideShow.playSlide(0);
            });
        });
    </script>
</body>
</html>
