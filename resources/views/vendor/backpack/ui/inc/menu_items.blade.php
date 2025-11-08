{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-item title="Lectures" icon="la la-question" :link="backpack_url('lecture')" />
<x-backpack::menu-item title="Lecture attendances" icon="la la-question" :link="backpack_url('lecture-attendance')" />
<x-backpack::menu-item title="Lecture types" icon="la la-question" :link="backpack_url('lecture-type')" />
<x-backpack::menu-item title="Rooms" icon="la la-question" :link="backpack_url('room')" />
<x-backpack::menu-item title="Speakers" icon="la la-question" :link="backpack_url('speaker')" />
<x-backpack::menu-item title="Users" icon="la la-question" :link="backpack_url('user')" />