
# Nexto-Mobile

# Sommaire

**1. Mise en place de l'environnement**
*Java*
*Node*
*Android*

**2. Lancement de l'application sur votre téléphone (Android)**
*Sur votre téléphone*
*Sur votre ordinateur*

# Get started

## 1. Mise en place de l'environnement

### Java

Rendez-vous sur le site d'Oracle pour installer le [Kit de développement de Java 8](https://www.oracle.com/fr/java/technologies/javase/javase-jdk8-downloads.html)

Vous n'avez ensuite plus qu'à définir la variable d'environnement JAVA_HOME de la façon suivante :

- Ouvrez le panneau des variables d'environnement (tapez "environnement" dans le menu Démarrer).
- Sélectionnez "Variables d'environnement"
- Une fenêtre s'ouvre. Dans la catégorie des Variables Systèmes, séléctionnez "Nouvelle".
- Nommez la 'JAVA_HOME' (exactement de cette manière) et renseignez son chemin, là où le JDK a été installé précédemment. Généralement, le chemin est de type : *C:\Program Files\Java\VOTRE_JDK*. Séléctionnez la version 8, si vous en avez plusieurs.

Notez que l'installation est également possible via le gestionnaire Windows Chocolatey, avec la commande suivante :

`choco install -y nodejs.install openjdk8`

### Node 

Une version 10 au minimum de Node est nécessaire, vous pouvez le vérifier à l'aide de la commande suivante dans n'importe quel terminal :

`node -v`

Si nécessaire, retrouvez le lien d'installation à l'adresse **[suivante](https://nodejs.org/en/)**


### Android

#### Android Studio

Pour commencer, téléchargez [Android Studio](https://developer.android.com/studio), puis exécutez le programme. Vérifiez bien lors de l'installation que sont au minimum cochées les cases :

Android SDK
Android SDK Platform
Android Virtual Device

Une fois ceci effectué, rendez-vous à la prochaine étape.

#### SDK Android

Une fois sur Android Studio, ouvrez les Settings. Si possible, recherchez "Android SDK", sinon suivez le cheminement suivant : *Appearance & Behavior → System Settings → Android SDK*.

Cochez le bouton **Show Packages details** en bas à droite, puis sélectionnez **Android 10 (Q)**. Vérifiez ensuite que sont bien cochées les cases suivantes :

    Android SDK Platform 29
    Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Maintenant sélectionnez l'onglet **SDK Tools**, puis de la même façon cochez le bouton **Show Packages details** en bas à droite. 
Cliquez sur **Android SDK Build-Tools**, afin de vérifier que le 29.0.2 au minimum est sélectionné.

Vous pouvez maintenant sélectionner **Apply** pour lancer le téléchargment des outils, puis passer à l'étape suivante.

#### Créer la variable d'environnement ANDROID_HOME

La manipulation que nous allons faire est assez similaire à la partie sur JAVA_HOME (voir 1. Mise en place de l'environnement > Java). Suivez donc ces étapes :

- Ouvrez le panneau des variables d'environnement (tapez "environnement" dans le menu Démarrer).
- Sélectionnez "Variables d'environnement"
- Une fenêtre s'ouvre. Dans la catégorie des Variables Systèmes, séléctionnez "Nouvelle".
- Nommez la 'ANDROID_HOME' (exactement de cette manière) et renseignez son chemin, là où le SDK a été installé précédemment. Généralement, le chemin est de type : *C:\Users\My_username\AppData\Local\Android\Sdk*.

**Afin de vérifier que l'ajout a bien fonctionné**, ouvrez un invité de commande **Powershell** puis tapez la commande suivante :

`Get-ChildItem -Path Env:\`

Vous devriez retrouver dans la liste le nom de la variable "ANDROID_HOME".

#### Ajoutez Platform Tools au path

Dans vos variables d'environnement du système une nouvelle fois, sélectionnez votre variable **Path**, puis double-cliquez dessus.
Tout en haut à droite, sélectionnez "Nouveau", puis renseignez le chemin de Platform Tools, qui sera de type :

`C:\Users\My_username\AppData\Local\Android\Sdk\platform-tools`

## 2. Lancement de l'application sur le téléphone (Android)

### Sur votre téléphone

Connectez votre téléphone à votre ordinateur, via un câble USB.

Dans les options du téléphone, accédez aux paramètres de **débogage USB**. Si vous n'y avez pas accès, activez le mode Développeur du téléphone (voir ce [tuto](https://www.nextpit.fr/comment-activer-options-developpeurs-android) si besoin).

Pour vérifier si le téléphone est bien reconnu, dans votre terminal du projet tapez : 

`adb devices`

Si votre appareil n'apparaît pas, vous pouvez essayez de taper la commande suivante : 

`adb reverse tcp:8081 tcp:8081`

### Sur votre ordinateur

#### Mise à jour des dépendances

Une fois arrivé à cette étape, dans un premier terminal (lancé à la racine du projet), effectuez la commande suivante, pour installer les dépendances du projet :

`npm install`

#### Adaptation des fichiers récupérés à votre environnement

Suite à cela, nous allons suivre une étape importante à vérifier dès que vous récupérez une nouvelle version du projet. Rendez-vous dans le fichier *gradle.properties*, qui se trouve au chemin suivant : **Android/gradle.properties**.

La dernière ligne, *org.gradle.java.home=C:\\Program Files\\Java\\jdk1.8.0_211*, est celle qui nous intéresse. Vérifiez que la version du jdk (1.8.0_2XX) correspond à celle installée sur votre machine (voir JAVA_HOME), et à défault, changez-là sans quoi vous rencontrerez des erreurs.

#### Lancement du serveur

Maintenant, lançez un premier terminal à la racine de projet. Nous allons lancer le serveur qui tournera sur ce terminal, avec cette commande :

`npx react-native start`

#### Build de l'application sur le mobile

Tout d'abord, vérifiez avec les étapes précédentes que votre téléphone est bien connecté, reconnu et dévérouillé. Ensuite, ouvrez un second terminal dans le projet, et inscrivez la commande suivante :

`npx react-native run-android`

L'application se lance ensuite sur votre téléphone, et vos changements se raffraîchiront à chaque sauvegarde sur votre éditeur de code.

# Erreurs communes

*À rédiger au fur et à mesure*

## Commandes utiles :

npx react-native start
npx react-native run-android

adb reverse tcp:8081 tcp:8081

cd android && gradlew clean

npm cache clean --force

Lors de l'ajout de nouvelles fonts dans src/assets/fonts:
npx react-native link
