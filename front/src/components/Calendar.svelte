<script>
    import { ArrowArcLeft, ArrowArcRight } from "phosphor-svelte";

    const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    $: firstDayOffset = new Date(year, month, 0).getDay();
    $: monthLength = new Date(year, month + 1, 0).getDate();
    $: lastDayOffset = new Date(year, month, monthLength).getDay();

    function last() {
        month -= 1;

        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        } else {
            date = new Date();
        }
    }
    function next() {
        month += 1;

        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        } else {
            date = new Date();
        }
    }

    // Full reference code:
    // https://www.geeksforgeeks.org/how-to-design-a-simple-calendar-using-javascript/
</script>


<div class="calendar">
    <div class="calendar-header">
        <p>{monthLabels[month]}&nbsp;{year}</p>
        <button on:click={last}><ArrowArcLeft weight="fill" /></button>
        <button on:click={next}><ArrowArcRight weight="fill" /></button>
    </div>
    <div class="calendar-weeks">
        {#each weekLabels as weekname}
            <span>{weekname}</span>
        {/each}
    </div>
    <div class="calendar-days">
        {#each {length:firstDayOffset} as _}
            <div />
        {/each}
        {#each {length:monthLength} as _, i}
            <div
                    class:today={
                        i === date.getDate()
                        && month === new Date().getMonth()
                        && year === new Date().getFullYear()
                    }
            >
                <button>{i+1}</button>
            </div>
        {/each}
        {#each {length:lastDayOffset} as _}
            <!-- Not really important to add these.... -->
        {/each}
    </div>
</div>
