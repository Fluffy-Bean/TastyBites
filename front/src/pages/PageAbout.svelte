<script lang="ts">
    import ImageWithText from "../components/ImageWithText.svelte";
</script>

<h1>Our story</h1>

<ImageWithText image="/wathog.jpg">
    <div class="padding">
        <h2>How it all started</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
    </div>
</ImageWithText>

<div class="spacer" />

<ImageWithText image="/dab.jpg" toRight={true}>
    <div class="padding">
        <h2>The hard times</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
    </div>
</ImageWithText>

<div class="spacer" />

<ImageWithText image="/MenuItemLoading.svg">
    <div class="padding">
        <h2>Whats next</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
    </div>
</ImageWithText>


<style lang="scss">
    @import "../styles/vars";

    .padding {
        padding: $spacing-normal;
    }
</style>
