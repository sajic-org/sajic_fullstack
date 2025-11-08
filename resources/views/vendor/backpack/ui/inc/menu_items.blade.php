{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-item title="Palestras" icon="la la-microphone" :link="backpack_url('lecture')" />
<x-backpack::menu-item title="Presença nas palestras" icon="la la-clipboard-check" :link="backpack_url('lecture-attendance')" />
<x-backpack::menu-item title="Tipos de Palestras" icon="la la-tags" :link="backpack_url('lecture-type')" />
<x-backpack::menu-item title="Salas" icon="la la-door-open" :link="backpack_url('room')" />
<x-backpack::menu-item title="Palestrantes" icon="la la-user-tie" :link="backpack_url('speaker')" />
<x-backpack::menu-item title="Usuários" icon="la la-users" :link="backpack_url('user')" />
