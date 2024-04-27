<script>
    import LoadingBar from "%/components/LoadingBar.svelte";

    const FunnyMessages = [
        "*patiently waiting*",
        "Taking longer than expected...",
        "meep...",
    ]

    let text = FunnyMessages[Math.floor(Math.random()*FunnyMessages.length)]
</script>

<LoadingBar />
<p>{text}</p>

<style lang="scss">
    p {
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%, -50%);
        animation: forwards text-fade-in 4s;
    }

    @keyframes text-fade-in {
        0% {
            opacity: 0;
        }
        80% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>