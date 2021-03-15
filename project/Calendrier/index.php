<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Koffi Cup - Calendrier</title>
    <link rel="stylesheet" href="assets/main.css">
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
</head>

<header>
    <h1>Calendrier</h1>
    <h2>Un calendrier élégant conçu en PHP et signé Koffi Cup.</h2>
    <h3>(Le responsive mobile est un peu au fraises)</h3>
    <!-- text overflow -->
</header>

<body>
    <?php
    // =========
    // Initialisation variables
    $months = array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
    $already_selected_value = date("Y");
    $earliest_year = 1950;
    $select_month = date("m");
    $select_year = 2021;
    $number_day_in_month;
    $first_day_in_nbr;
    $previousMonthDay = array();
    // Constantes
    $today = date("d");
    $todayMonth = date("m");
    $todayYear = date("Y");
    // =========
    // Check si Get contient un truc, si oui, applique les valeurs du get dans la variable
    if (!empty($_GET)) {
        if ($_GET['month'] != "") {
            $select_month = $_GET['month'];
        };
        if ($_GET['year'] != "") {
            $select_year = $_GET['year'];
            $already_selected_value = $_GET['year'];
        };
    }

    // =========
    // Nombre de jour dans le mois cible
    $number_day_in_month = cal_days_in_month(CAL_GREGORIAN, $select_month, $select_year);
    // =========
    // Premier jour du mois cible
    $date = $select_year . "-" . $select_month . "-01";
    $date = date('l', strtotime($date));
    switch ($date) {
        case "Monday":
            $first_day_in_nbr = 1;
            break;
        case "Tuesday":
            $first_day_in_nbr = 2;
            break;
        case "Wednesday":
            $first_day_in_nbr = 3;
            break;
        case "Thursday":
            $first_day_in_nbr = 4;
            break;
        case "Friday":
            $first_day_in_nbr = 5;
            break;
        case "Saturday":
            $first_day_in_nbr = 6;
            break;
        case "Sunday":
            $first_day_in_nbr = 7;
            break;
    }
    // ========
    // Dernier jour du mois cible
    $last_day_in_nbr = date("l", strtotime($select_year . "-" . $select_month . "-" . $number_day_in_month));
    switch ($last_day_in_nbr) {
        case "Monday":
            $last_day_in_nbr = 1;
            break;
        case "Tuesday":
            $last_day_in_nbr = 2;
            break;
        case "Wednesday":
            $last_day_in_nbr = 3;
            break;
        case "Thursday":
            $last_day_in_nbr = 4;
            break;
        case "Friday":
            $last_day_in_nbr = 5;
            break;
        case "Saturday":
            $last_day_in_nbr = 6;
            break;
        case "Sunday":
            $last_day_in_nbr = 7;
            break;
    }
    // =======
    // Convertion du mois en lettre pour l'affichage
    $month_in_letter = $months[$select_month - 1];
    // =======
    // Modification de l'URL pour passer d'un mois à un autre (variable utilisé plus bas)
    $decrementMonth = "index.php?month=" . date('m', strtotime('-1 month', strtotime($select_year . '-' . $select_month . '-01'))) . "&year=" . date('Y', strtotime('-1 month', strtotime($select_year . '-' . $select_month . '-01')));
    $incrementMonth = "index.php?month=" . date('m', strtotime('+1 month', strtotime($select_year . '-' . $select_month . '-01'))) . "&year=" . date('Y', strtotime('+1 month', strtotime($select_year . '-' . $select_month . '-01')));
    ?>

    <div class="grid-container">
        <div class="bandeau">
            <div class="arrow-left arrows"><a href="<?= $decrementMonth ?>" class="las la-chevron-left"></a></div>
            <div class="arrow-right arrows"><a href="<?= $incrementMonth ?>" class="las la-chevron-right"></a></div>
            <div class="main-month"><?= "$month_in_letter $select_year" ?></div>
            <div class="select-date">
                <form action="index.php" method="GET">
                    <select name="month" id="list-month">
                        <?php
                        // Boucle qui genère le select des mois
                        foreach ($months as &$value) {
                            $indexMonth++;
                            echo "<option value='$indexMonth'> $value </option>";
                        } ?>
                    </select>
                    <?php
                    // Boucle qui genère le select des années
                    echo '<select name="year">';
                    foreach (range(date('Y'), $earliest_year) as $x) {
                        echo '<option value="' . $x . '"' . ($x === $already_selected_value ? ' selected="selected"' : '') . '>' . $x . '</option>';
                    }
                    echo '</select>';
                    ?><button>Valider</button>
                </form>
            </div>
        </div>
        <div class="inner-calendar">
            <?php
            // Boucle qui genère les jours du mois précédent (inversion de l'array ensuite).
            for ($i = 1; $i < $first_day_in_nbr; $i++) {
                $previousDay = date('d', strtotime('-' . $i . 'days', strtotime($select_year . '-' . $select_month . '-01')));
                array_push($previousMonthDay, $previousDay);
            }
            $previousMonthDay = array_reverse($previousMonthDay);
            // Boucles qui gènere les cases avant pendant et après le mois.
            for ($i = 1; $i < $first_day_in_nbr; $i++) {
                echo '<div class="day-number outMonth">' . $previousMonthDay[$i - 1] . '</div>';
            };
            for ($i = 1; $i <= $number_day_in_month; $i++) {
                if ($i == $today && $select_month == $todayMonth && $select_year == $todayYear) {
                    echo '<div class="day-number today">' . $i . '</div>';
                } else {
                    echo '<div class="day-number">' . $i . '</div>';
                }
            }
            // Celle ci s'arrête à la fin d'une semaine 
            for ($i = 1; $i <= 7 - $last_day_in_nbr; $i++) {
                echo '<div class="day-number outMonth">' . $i . '</div>';
            }
            ?>
            <!-- Flemme de boucler en dessous -->
            <div class="lundi day">Lundi</div>
            <div class="mardi day">Mardi</div>
            <div class="mercredi day">Mercredi</div>
            <div class="jeudi day">Jeudi</div>
            <div class="vendredi day">Vendredi</div>
            <div class="samedi day">Samedi</div>
            <div class="dimanche day">Dimanche</div>
        </div>
    </div>
</body>

</html>