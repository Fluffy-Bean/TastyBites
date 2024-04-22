<script>
    import temp from '/temp.jpg';
</script>

<div>
    <img src={temp} alt="Rufus" />
</div>

<style lang="scss">
    div {
        height: 400px;
        background-color: #f0f0f0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
    }
    div > img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
    }
</style>