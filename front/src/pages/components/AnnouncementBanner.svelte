<script>
    import LoadingBar from "%/pages/components/LoadingBar.svelte";
    import LoadingImage from '/BannerLoading.svg';
</script>

<div class="announcement-banner">
    <LoadingBar bottom={true} />
    <img src={LoadingImage} alt="">
</div>
