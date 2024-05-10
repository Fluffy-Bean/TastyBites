<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { ArrowArcLeft, ArrowArcRight } from "phosphor-svelte";

    const dispatcher = createEventDispatcher();
    const weekLabels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];
    const monthLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const today = new Date();

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let selectedDate: Date;

    $: firstDayOffset = new Date(year, month, 0).getDay();
    $: monthLength = new Date(year, month + 1, 0).getDate();
    $: lastDayOffset = new Date(year, month, monthLength).getDay();

    function last() {
        month -= 1;
        updateDate();
    }

    function next() {
        month += 1;
        updateDate();
    }

    function selected(day: number) {
        selectedDate = new Date(year, month, day);
        dispatcher("selected", { date: selectedDate });
    }

    function updateDate() {
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
        <p>{monthLabels[month]}&nbsp;<span>{year}</span></p>
        <button on:click={last}><ArrowArcLeft weight="fill" /></button>
        <button on:click={next}><ArrowArcRight weight="fill" /></button>
    </div>
    <div class="calendar-weeks">
        {#each weekLabels as label}
            <span>{label}</span>
        {/each}
    </div>
    <div class="calendar-days">
        {#each {length:firstDayOffset} as _}
            <div />
        {/each}
        {#each {length:monthLength} as _, dayNum}
            <div
                    class:today={
                        dayNum+1 === today.getDate()
                        && month === today.getMonth()
                        && year === today.getFullYear()
                    }
                    class:selected={
                        selectedDate
                        && dayNum+1 === selectedDate.getDate()
                        && month === selectedDate.getMonth()
                        && year === selectedDate.getFullYear()
                    }
            >
                <button on:click={() => { selected(dayNum+1) }}>{dayNum+1}</button>
            </div>
        {/each}
        {#each {length:lastDayOffset} as _}
            <!-- Not really important to add these.... -->
        {/each}
    </div>
</div>
