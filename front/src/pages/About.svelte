<script lang="ts">
    import ImageWithText from "../components/ImageWithText.svelte";
    import Hog from "/item_images/wathog.jpg";
    import Dab from "/item_images/dab.jpg";
    import Beetle from "/beetle.jpg";
</script>

<h1>Our story</h1>

<ImageWithText image={Hog}>
    <div class="section">
        <h2>How it all started</h2>
        <p>
            - started as a small group of friends that liked to cook together
            <br>
            - Then sold things locally
            <br>
            - Decided to get together to open a restaurant/diner
        </p>
    </div>
</ImageWithText>

<div class="spacer" />

<ImageWithText image={Hog} toRight={true}>
    <div class="section">
        <h2>Our Struggles</h2>
        <p>
            - Covid hit during opening and drained nearly all of their savings right as they opened the restaurant
            <br>
            - Got through by being able todo home delivery of the food
            <br>
            - Managed to get a high rating on most review websites
        </p>
    </div>
</ImageWithText>

<div class="spacer" />

<ImageWithText image={Hog}>
    <div class="section">
        <h2>Our Team</h2>
        <p>
            - Describe 4-5 fake people, some cooks, some do delivery, some cleaning, some designing
        </p>
    </div>
</ImageWithText>

<div class="spacer" />

<ImageWithText image={Beetle} toRight={true}>
    <div class="section">
        <h2>Thank you</h2>
        <p>
            - generic thank you for supporting us message here
        </p>
    </div>
</ImageWithText>


<style lang="scss">
    @import "../styles/vars";
</style>
