<script lang="ts">
    import ImageWithText from "../components/ImageWithText.svelte";
    import Hog from "/item_images/wathog.jpg";
    import Dab from "/item_images/dab.jpg";
    import Beetle from "/beetle.jpg";
</script>

<h1>Our story</h1>

<ImageWithText image={Hog}>
    <div class="padding">
        <h2>How it all started</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
    </div>
</ImageWithText>

<div class="spacer" />

<ImageWithText image={Beetle} toRight={true}>
    <div class="padding">
        <h2>Our Chef</h2>
        <p>He sucks at his job</p>
    </div>
</ImageWithText>


<style lang="scss">
    @import "../styles/vars";

    .padding {
        padding: $spacing-normal;
    }
</style>
