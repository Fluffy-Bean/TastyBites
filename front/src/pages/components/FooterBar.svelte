<script>
    import { TwitterLogo, FacebookLogo, InstagramLogo, TiktokLogo } from "phosphor-svelte"
</script>

<footer>
    <div class="footer-section">
        <p>TastyBites is not a real restaurant</p>
        <p>gwagwa</p>
    </div>
    <div class="footer-section">
        <h4>Find us on:</h4>
        <ul>
            <li><a href="www.twitter.com"><TwitterLogo weight="fill"/></a></li>
            <li><a href="www.twitter.com"><FacebookLogo weight="fill"/></a></li>
            <li><a href="www.twitter.com"><InstagramLogo weight="fill"/></a></li>
            <li><a href="www.twitter.com"><TiktokLogo weight="fill"/></a></li>
        </ul>
    </div>
</footer>

<style lang="scss">
    footer {
        padding: 16px;

        position: relative;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        border-top: 2px solid #6A9343;
        background-color: #443023;
        color: #e1dcd3;

        overflow: hidden;
    }

    .footer-section {
        padding: 16px;

        min-width: 200px;
        width: 100%;
        max-width: 500px;

        > ul {
            padding: 0;

            display: flex;
            flex-direction: row;

            > li {
                margin: 0 16px 0 0;
                list-style: none;

                > a {
                    height: 40px;
                    width: 40px;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    text-decoration: none;
                    font-size: 16px;

                    border-radius: 99999px;
                    background-color: transparent;
                    color: #e1dcd3;

                    &:hover {
                        background-color: #fffbf4;
                        color: #33251a;
                    }
                }
            }
        }

        > h4 {
            margin-bottom: 10px;
        }
    }
</style>
