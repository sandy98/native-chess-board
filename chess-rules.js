const versionInfo = {major: 0, minor: 10, release: 7};
const version = `${versionInfo.major}.${versionInfo.minor}.${versionInfo.release}`;

//////////////

const genRange = function*(start = 0, end = 10, step = 1) {
    if (start === end || step === 0) {
      yield start;
      return;
    }
    let fcomp, fmodify;
    const fminor = (a, b) => a <= b
    const fmajor = (a, b) => a >= b
    const fadd = (val, step) => val + step
    const fsub = (val, step) => val - step
    if (start < end) {
        fcomp = fminor;
        if (step > 0) {
          fmodify = fadd;
        } else { fmodify = fsub; }
    } else {
      fcomp = fmajor;
      if (step > 0) {
       fmodify = fsub; 
      } else {
      fmodify = fadd;}
    }
    for (let n = start; fcomp(n, end); n = fmodify(n, step)) {
    yield n;
    }
    return;
}

const range = (start = 0, end = 9, step = 1) => Array.from(genRange(start, end, step));

const onePixel = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=`

const classicSet = {"size":60,"b":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAC0klEQVR42u2YTagSURSAn+YPlBWvxCRMLZ6JpCCuyorIihCjFkqvWkQSrjIQRdxEENKjhVG81UNBxU3YSohcBRUhuGgjamTRoujnESbRD0WvOp07XGEYHEfFmWbhgQ9R9N6PM/fce65zc7OYxcixC7mN3EEuyE3OhLxFgMUVOQle4sgRXiMauQieHyDYQVRyEVyHFFlyH5ADcnrEm5AVluAb5LBc5A4izwc8YsJNmt3/FnHkN49cnyfITqnFlEhOQIzNe2S/lIJ3x5Dr85UuB9HjFp+E0WgEh8MBWq2WT/ITYhVT7viwLBWLRSCxsLAwLJMPxNzrng6aVK/Xg8vlgmq1ygiGQiGw2WygVCr5JE+KIbiXLyupVAq40ev1QKfT8QneE0MwySfo9XohnU5Ds9lk5HK5HMTjcdBoNHyC75AN0xZcEqrUfD7PCFosFqGK/oLopy0YERKsVCqMoNvtFhJ8IUanQ3q+b8MmjkQiUCgUwGQyCQlmxKrkpQk2aC49ZLtYguuRFntCg8EAPp8PwuEwJBIJpqKj0SgEg0FwOp2gUqm4gmGxT5I9yGcycX/NDYtutwuBQKAvtyLVWexXKBQ/Y7EYZLNZZmP2eDxgtVrBbDaD3W5nsppMJqFcLjOf4W+qtMmQJDaSLI659q5K3aRCJpOBTqcDrVZrIO12GxqNBtNA4PfvSym4rFaroVQqQa1WG0q9Xge/308Ev4tZvewwIh9xDa7h6w86Md9j/UP7wF/0/TWpMkgysRXZgTweIrhGr6RbkG3I/LRFHMhp5AyySAkhJ5Bz9Kr5lyPEPW1eIZeRU7TNWmRxFjk2ybFHtoNlOuE4ldpG0hOcLs+QfeMI3pjwGLuIqJGXE/yWXAcso8gZhJoCHtKcpdGZYIzrowgeGmNAUsWP6F2FG/P04r46xngPRxEkFXcU8Y3A7hHG20zX1xGBsUixeGZ/s85CbvEPlohjwQUcDyQAAAAASUVORK5CYII=","B":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEUklEQVR42u2YWUicVxTH41L3WsdUU6piDSK4gRSElFpKtVKVWhfEVB9CtUQfal4iioIIZWjsQ4syiAwWpIpS9cEFaRGt1JInF9xw6VgXXOJSMEpNVVr15Pwv9xscZ4ZMg99kHjzw45s7c7/v/ufce84997tx49quzWa7zdQxPzFfOJq4YGYzMDCQYmJiyMnJibhd5UgCv3J1daWFhQWC5efnQ+Aa4+YoAu+5uLjQ8PAwHR4eUmpqKgQaGFdHEejC/Ojm5kYBAQEQt80kONIU+zJ6hvz8/CBwnfnIUcR9wPwREhJC/f39tLe3RwUFBRAJvpfefWX2kDlNT0+n7e1tumgtLS3k4+MDkY+ZMHsLc2Z+gJeqqqrImk1NTVFERAREbjHv21NgJ8Q1NjbSi2x3d5fi4+Mh8lAuB9WtFuKamprMxKyvr9Ps7CwdHR2ZfL+/v09xcXEQuce8o6a4TyCusrLSordycnJEcMzNzVkUL1PQr2rmuvHY2Fg6OzszGRwBMjo6SomJiUJgc3MzzczM0OnpqUm/1tZWJbo/U0PgHTy8ra3NzDvV1dXKwEY8PDzo4ODApN/5+TlFRUXh9z41BJZh0K2tLTOBQ0NDVFpaqkSs2Iu1Wi0dHx+b9S0pKUGfJ4z3VQt85OvrKxKxNcvLyxMCDQaD1T4VFRXo8zfz5lULvI/Bx8bGrA4uiwQaGRmx2ictLQ19FtWodFDzPSsqKrI6eF1dHeXm5tLKyorF35eXl8nT0xMCv1Mrkh+h7kPEvoxlZGRA3FPmbbUEejGzYWFhYoeAYU1iSnt6ekSEg46ODhocHKSlpSWjuJqaGiXCC9TeSaKZA5T2SUlJZunlMsHBwZSVlaW09fbai1OZE41GQ2VlZdTZ2Sm8iJIfEYwkPTAwQPX19ZSSkqKI+0UWGXax1+HFhoYGm9ZeaGgoBFbbtUjFyW18fNwmgcnJyRD4sz0F6ry8vERF09vbKwKkq6tLXNHG5+7ubtHu6+ujzMxMCPxHzei9aG8xf7EH/+PrsRzYWpCcyTrwX9n+2l4ehCduMiHM74jU6elpZa2RTqej2tpafMafuMf4M7cYzVULiWRymc+Zu5Ic5lMmH0dN5ry9vZ1OTk6Ipx2CnpWXl4u1FxkZCZHLzAMmQ5ZZdy+QxyS/zLaHdKCDB7BzuLu7G8HZF1d/f3+Kjo4mvV4vxBQXF0PMHKNFUbG2tiaSeHZ2NgUFBZG3t7fxXgVUR3Lq55n3/o/Ab7FnYqpWV1dpY2NDVMQKaOMNgmLIhXKgL5nXmD/Dw8NpcnLS2GdnZ8fkGWBzc1NkgoSEBOU4EGqLuEBME7I/Nnck3/n5eRPw3cTEBCEPwotSnPbS0jDgdUhhYaFI2rjH0rMWFxdF5Msi4htbBH6IATEFzs7OFqNTvr0iGcXD8qxy2TTy4L5z6R4zMPVyrN9sEYiI+5hJtIEIG573hlxfSS94FoLl3evXrNfmaPYcziuFechUn/0AAAAASUVORK5CYII=","k":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAFC0lEQVR42u1YWUhtVRi+zjnhPJZppWiKZYqCiIIVqShiPiqiIPgQ6oMT4ohDzhM4pC8Ol1SUQHG65MNFxCm8KggJqTlGimOamTj9rW+xtxztnsF7D3QIf/g4Z501ffuf93n27Eme5P8leQz9DJaqRkyDQYthmoEY3Bk0VYngc4bfGM4Fgr8zrDF8oCoEuxl2GC4EgvsC4Q9VheA7DPoMLwWCnzHoMaipmi+OCATt/ovLjQSTWclYMyUQ9JQyry+cYaNMYoEMPzBsCUEA//qRIfwB+UGBHAlrv5SYd2JoYvhVOOOQ4SeGZAadNyWGtPEdLnRzc6OCggLq6emhiooK8vb2Fokget+HabW0tKi/v5/W1tbI09MTc38xfMIQw3BmYWFBycnJ1NnZSY2NjRQSEiKe8YrB7bHktEV/KisrI1EuLy/vvjc1NZGOjg4uONDX16eRkREaHR2l7Oxs2tvbIy8vL8z9gTOioqLo+PiY77u5ubk7Y2JigpycnLDuiMHrMQQbNTQ0qK+vjx80MDBAPj4+ZGpqSh4eHlyTkLGxMU7S1dWVj11cXLhWtre3qaGhgX9PS0vjc1tbWxQZGUmWlpbk6OhIubm5/PejoyNyd3fH2g0GU0XIwSyUl5fHDxAveghRs11dXXzc1tZGvb29FBERQbu7u6Snp0fBwcF8zcLCAif28IygoCA+v7y8LFqjWBGC3xobG9P5+TktLi6+lpwIkIOEhoaSoaEh7e/v833x8fGkpqbGx4eHh2Rrayv1DLgEBG7Axr8I7iU7lwUGBvJNKSkpMgmamJjQyckJrays8HFrayv3MUnTxsXFyTzDzs6Obm9vqaOjA+O/Fak+L2EmiaeSifz8fL42ICCA/P39qbm5mf9+cHBAq6urpK6uLnO/kZERXV1d0dDQEMY3DB/LI/g9AgJSWFgol6CNjQ1dX1/T4OAgNyvMGRYWxvcnJibK3Y/AkvD1Q0VatW/gsNAATCdPAwCiHVowMzPjY5BFShLHspCTk8MJCnlxUpEgeQ/ZPjMzk29MSEiQe0l4eDhfizQCLV5cXPCkLW+flZUVnZ6eclfQ1NQkobIoJM1IvqgKuMzZ2VnmRciP0Fh9fT3Pk5CYmBi5BIeHh/lapCOhXTNSlCD84MDX15cfAFODhKzL5ufnaXp6+s5k8h4KJRNSV1cn/hb72HL3NTYip0GmpqZ4xEm7ECZFOUO5Q9DY29tLXZuVlcXPxFrBx3ve5iXoLplCQ9bW1uTg4EDR0dHcpOPj41zDoiBRQ1CP5+bmqLu7mzcJyAxwG1HDMzMzZGBgAHKzQhv2xlIHkmLtPDs7I0nBGBUHkdve3k4tLS285EHjOzs799aiqojWEFzmZwZbZfSE5UiiSUlJvHyhWYiNjeVNgq6urlRTIjLFvFhZWckbBjyIoLk5ZTeufbKcHrW4pKSE+6LY1cjAnwzvKrvlf4FyBn96qDVUk6WlpXvmRE6UXIP2zc/Pj1JTUzG+ZvhI2W9tG6Wlpfzy9PT0e5dra2vz1ml2dpYnXiR5c3Pze2uQHxHdmAdZIUsoTfACfoUO5aFmHgKRKm0O0V9VVSX2hlnKJBiMfJWRkUFFRUVUXV1NtbW1/wICAVp+3VxNTQ0VFxdTeXm5mMSfK5NgKoJgcnKSNjY2aH19/Y2xubkpNgavlPrfC5oAaBGfbwOcIVSP88fUXnnyKcNXDJ8rCV8I79u6T/9YPomqyz+Q/sFvovNp2gAAAABJRU5ErkJggg==","K":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEQklEQVR42u1YbSjlaRQfb2MZuvLBtMwqRDaZ8RKJEuslUst8kCL5JDVliiU14tMO+SBSM1ZeylqNKezW1GykS8oMZry3IYbbtFFmjLdd1NDZ83t6/nLNZf5/86+9TU79ui/Pc8753eec/znnudeuXcmVfF1SyfiD4WFtxOwYDoyXDGIEM+ytieCvjL8Z+5LgGmOF4WMtBJ8w1hmHkuA7SdjXWgh+w7jBMEqCoQxnho215eJzSfC7/8O5QYbs5gV7XkiCYees35A2vtWTWDyjm/FWPgTIrz7Gj2fIP5PkSO5NPLXuz3jMeCNtbDLGGPcZjpclhrLRCIdBQUFUWVlJ7e3tVFVVRZGRkQoRPL3eCK2DgwN1dHTQ1NQUhYSEYO1fxm1GLuMfDw8PKiwspLa2Nqqvr6fU1FTFxmtGkFZy15V8qq6upqOjIzorjY2N5OjoCAfvnZ2dqbe392Rtc3OTQkNDsbYNGzk5ObS+vv6JjaGhIfL398e+D4xwLQQf2dnZmTm1JIODg4JkYGDgJ2v4YSBXWlp6oY2NjQ0KDg7GXhPDXQ05hEWEVI10dnYKInV1dSffmUwmcnJyopSUFFU25ufnlWj8rIbgQzc3N9ra2iK1kpSURC4uLrSzsyM+5+bmCtIgqlays7OhsyjT6+JaFh8fT1pkdnZWEGpubqaDgwPxvqioSJON1tZW6B2o6T7GjIwM0ip4smNjY6mpqUkQXFlZ0aTf09MDvWPG958j+FtERIRmgiBmY2NDXl5eFBUVpVkfOSzr42dHtXtI2NXVVU0OFhcXCbUQp1dTU6OZYHJyMnRH1Dwkt1DtS0pKNDk4Pj4mX19fQdBoNGrSnZmZIZQ12VlUyS8oEwsLC5ocJSYmCoLLy8ua9BISEkiOawa1BJEH75FLlrrIeZKXl0f29va0vb2tWqe2tlZpeXla291dKBYUFKh2VlxcLOqhWunr61NC+/RLLkEWuwrC2N3dLdYyMzMpOjqa0JOxPywsTAwDGA5QG8fGxujw8NBMf3R0lFxdXbH/lRzDLi31cFpeXi4KckVFBQUEBChhESfg5+cnCKanp1NWVhah0KO/GgyGk30gg6FhYGCA+vv7Cd2Kv/+L4anHTFgji6hwhtbW0NBAExMTtLu7e24IcWoo2F1dXZSfn0/u7u50amac0Htw/d3Hx4f29vYskkHvRg7GxcXR+Pj4hXnKtvYYXnqP/H8iZJgDz57a0tISeXp6nj4damlpMduDajAyMkIxMTFYP2L46X1rMynOy8rKzJxjQMDsiLkQXQgPztramtme4eFhsx8gq4Ruggv4R29vbzF17O/vWwwf6h9O05LgBBH6tLQ00bPZ3gM9CabY2trS9PQ06SHh4eHKfUY3+QllAiUCl6LJyclLY25uTkza8rKk338vCAtOEa9fAtgA5PXToBfBO4xkxg86IUHet52u/rG8EmuX/wAA3De94co77gAAAABJRU5ErkJggg==","n":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADJ0lEQVR42u2YXUiTURiA3Z+usbYYy2V/ktBsm1MINi8aGBEhkml3IrsdiHQ3RIggyBoIXnUTK1YQCF3MpGgSBGI0BkU2qDGSIsOEmSv6WTX6sbf3fJwTHx/T3PlOYxc78KDnZZzv2Xfec96X1dXVRm1wD201y11DTlarXBABJFGNcp1IgQr+RA5UU76NIt+oHONqNcgdRB4oxOTcpp+p+NAjF5DfG8hBU1MTmEymNfz/PKKplJwNSW4kxnA4HBAOh6G7u5vM7yN7KiE3I5cYGBiAVCoFra2tJSVtNhskEgkYGxsj85eI83/JHUdesAdrNBoIhULARjqdhvr6+pKSFosF8vk8jI+PM0m7SLFtyGXlQ3U6nbR1vb290NfXB/39/dDQ0LDudgcCAemL0O2+I0ruBLK4mXzbDMlkErLZLJurqjZkC6ICpL7LTzpLCZqvKV45I5IlC5rNZnC73aDX63kFI8gHNvf7/ZLg0NAQmf9CPDyCFuQLWTASiUgLulwuHrlFKsDKHzQ3N0vrxWIx9plTvG9wiSzQ1tYGPT090onlEDxN6/HfmNVqhUKhAHNzcyw2yVslnqvMvbe0cpyVxw0GA+RyOchkMiz2kDcPX9MEv4J8KlMuj3iRvchH5dW0vLwMCwsLLPYKMZUrZ0AuIR10uzPriBSRHM2xH/Stn0OsiLvU9WQ0GmF1dRXm5+dZ7B2ynbdd71zn7T1BBpF9iBnZQcuXA3HRk1ss9aXsdjsUi0WYnZ1lsc/ITt5t3k8ryJrsIZM0R+Unfhp5jLz51/a3tLRIpzgej7MYefu71FaTDtrCP0J0svhh5Fk5+en1eiXBaDTKYu+RRlFlbyv9uwW5yXO6fT6fJEjuVxpborsgtFG9y3v9sIaB9Ig09lSxK6rHRTX3Y1dXlyQYDAZZ7J5IuUNqmwcmSFsuwg2RgtNqBdvb25WC10XJNSqrAg/kol5ZWYHh4WEWuyVK8IiopnVkZASmpqbYPC3qd5yQKEGtVgsTExPgdDrJ/CuyW4TgqChB1gh7PB42HxQheEakoIIZEYKkdTpGc1EkR5FAJX91qI3aKGf8ATh4ueed9+0FAAAAAElFTkSuQmCC","N":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADp0lEQVR42u2YX0hTYRTAdX9kTdQcbWr/ILEIU4ReQtZTDEHIsLeIEFR6EJdvIkKCQlMEFdlLrkFhGIQPZXNKkCDSmBb4b2YEmzWHkmCTba501HY653K/mKXi7m5jDzvwe7l3++7vnu9833e2tLRUpEJwSJJZ7glyM1nl7iCAjCWj3BVkOy8vjwR/IheTqd5akB/FxcWwtLQE+fn5JPk4GeQuI29pWuvq6mBzcxMoWltbgZ9qC/+ZhIcMMSCRkpISmJiYgOgIhULQ29sLBQUFJBlGHiDpiZJTITbKEGXqsNjY2IDa2lqWzSnkTCLkxhUKBVitVk5iYGAAqPbsdvuBokajkUm6kAv/S+464pTL5TA8PMw9uL29nT0YioqKIBgMHijZ3d0dLXlCTLHjyCMaXKvVwtzc3J86m5mZgcXFRVhYWIDp6WnY3d09dMorKyuZpFUsuRvIF6VSCZ2dnRAOhyGeWFlZgczMTCYZ12lDU2CigSoqKrgsCYlAIACRSGTPtebmZiZoFyqnQD7m5ORwW4Xb7RacMapRv9+/59ra2hrL4i/kkhDBbCTY398PTqcT0tPTufoSMp20R+7s7Pxzr6qqimVRLzSDHsoeLQKLxSKo9urr60Gn0+17r6uriwk+E3pKfCosLITc3Fzo6emJWW5oaIgTmJyc3Pf+6OgoE3wntA7dSAgxI35awazY19fXYWRkhFvVjY2N0NTUBGNjY2Cz2UCv10N5eTn38La2tgNfgBoKXvAzooxVTo48RMr46f6gUqm4RoCmJjs7mw2+g3xFvGyzLi0thZqaGhgfHz80w6urq0AbPn7nG6IW2q5Tf+eXyWRcHTY0NDCxOeQ2cg7JQu7R9erq6iOXgMfjgYyMDBorgJwUOs3n6QSRSCRhtVodXdSyqM8co6OL7m9tbR1Z0OVygVQqpfG2kVPxniZlfAv/HpFGXb/KFzmYzeaYFpHD4WAvTOWhEevYy4rK2gt6gEajgb6+vphXOa1uXtDD77uiNqqvaXBaxV6vV9AJQ90QL+j4a1biDiMNTP1dPGEymZjgGzHltDQonRDxBm3+vOBzMQVf0m8Mn88Xt6DBYGCCT8WSo5Xm6+joADEiqrt+JZbgNRpwfn5eFMHBwcHoTV+UX3t3qXHYr3USEsvLy1wbh+N+R06LIdhCp8XU1BSXxdnZWcHQbxoahxpiPou3xBC8T4PRW/NvLhj6Ph6fHGL+0XQWqeBrUUx0/JGZsH8dUpGKWOI32DG/8ZSL6t8AAAAASUVORK5CYII=","p":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABYElEQVR42mNgGAWjYBSMgiEBRIA4D4iXA/EyIM4CYv7B4jhzIH4AxP/R8HUg1h5ox4kD8UssjoPhu0AsMJAObMDjOBjOH0gH7iLCgasG0oF7iXDguoF0YB8RDqwbSAeqAvEbPI57CsQyA52TS/E4MGWgHecNxA/xOPA2EDsMlONANcc/ItLgTyBOoqfDWIB4KhEOQ8ed9HCcKBBvgloICr3fQPwLR0j+g8r9RpJfTuuaRRiILYFYC4rVgTgQhwNBDnMFYg2oWm2oXro3IkLxRKvLYGjNzMPjwO6Bdhw7ED/B48BrQMw4kA70IyL32o62ZnAAXyLLv38DEYpyQPyChEL6HrT1TRegCMRXyahJTgOxJK0dFwDEz8hwHAzfB2K3gWhWkYrT6FlbkIupWsucpoEDd1LLcaxA/JYGDrxHrVqGDYg/08CBoCqSiRoOZIQWtKA040Ql7AJteo2CUTDoAQD3o0UpmCZENQAAAABJRU5ErkJggg==","P":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACvUlEQVR42u2XT2iScRjHp6TpPNSWIW0RxpDCgQwRQ1DWcoYQZh0SEbzo7OBgsUN4i64RdutoeGosRoduJV29DEX8k4hYtpUzqIOEDJW9T88j7ztoIg189WfgFz4gr+/7+uH3vs/veZyammSSSSb5L6JGNpAt5DUSRs6Ni9wNpCqXy8FisYDZbAapVAp4rIgsspbTID9MJhMUCgUQkkqlQK/Xk2QFOc9S8OnMzAwcHBzAyZTLZVCpVCT5iKXgB5fLBf2yvLxMgm9YCn70eDx9BZ1OJwm+ZSn4QqvVAsdxPXKHh4eg0WhI8AlLQR3yMxgMQq1W64oS+/v74PV6Se47cpl1JT9GwO12Q7vdhmazCSsrKyRHrLGWu4N8Jbl6vX78ePf29sBut5NgGbnJSm4DN2QuEon0LZL19XWSbCGBUYqdQV5StwiFQlCpVKBUKkEul4NsNtuFPtMx2gt9Pp/wuJ+NQu4i8o5+UCKRcLOzsx2FQtGWyWQctTqlUtmFPtMx+o7OwfM5XnJr2J3lAmJB9DzXkPsksL293V05Ih6PkwyJOZDr/LmL/LUjHyIe4CpBo9E4fvdoy5menibJ1XGYZl4ZDIa/iqPT6cDCwgIJPmctdxb5Fg6HeyqYL45PiISl4F16+ROJRI/gzs6OUL02ptOMTqfrPtKToY4yNzfHdJpx0QrFYrG+G3U0GgV+ixn5Kl5B6jabDY6OjvoKtlotWFpaIsnP/PQ9klxFCvPz81CtVuFfKRaLQNsQXrOLXBq23D2kRnKZTAZOm2QyCWq1miS/ILeHOlY5HI5TrdzJUG+2Wq1CZT8UvVvQjTc3N2HQBAIBQVLULrNLQ6hYMRqNJPheLDkZ8ou6RT6fh3Q6PRD0/9nv9wuVLUqXkSO/af4jcMwaCOE+1CIRqRiCEn6jpXfmlkis8qPXJJOMff4AhKhv/Cht2GwAAAAASUVORK5CYII=","q":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADfklEQVR42u2YX0hTURzH3dwG1WZjDSywCaIEPcjKaIRp0XL0kCIJhogkPoh76UkW4jCZoQ4jIinKIu0fJuvBUDEb9WDLiILUrSAK0wmF9WIR4XLz1znj3nF2Ovfa3L2jh/3gA17O957f957zO39mRkY60pEO2WJLAlptKo1pEH2IJcRLxAER7R6ED/ENcTvBj9pwuBBA8BmhZ+g2Iz5Q2gupMPiGSoqxMHS7GbqPqTB4hUr6CWEQqLt3lPZOKgzi6fQSSc+IaJsIHa7FbalaKOeJxHihKAV0TwjdjVSu5BfU1J1gaI5SmrcIhRTJ93F15kaYGO243n5QyV8zdE8pzW/EToYuG3EOcQ1xcD1zexG/iE7nENspTSljdWKOE5pD/6Dh6zlAfUSpmMHLjE5PUZrTAsmfE5pHAhon1VclQ3MvkU14jfFFtwSSY/Yjdom0P6T6MiPClOaSmEEj4hUhjiDOUhq/iIExxAORdlwyaqKvZm5a+Xa/QJ3GxSaEFeEhXnzMvYjP0p8iBtYjxNV0Njea5IfZELpEVvNW7kJAnrl9SZgj98M54nkZsWOjW46dkWBNApMkjmT2RFwv7yU2RBLkbj1JRZOMBpulOFlw4X6Vwdwyt2tIEldlMHhXyssBffCDwWAAq9UKDocDBgcHwefzgd/vh0AgAFNTUzA0NAQtLS1QVlYGRqORZbBSSoP48rmUlZUFdXV1MD4+DqFQCPiIRCKwuLgIs7OzMDMzA8FgEMLhcKx9dXUVvF4vNDQ0RD8M9fVdyunlY6KioiKWcGRkBOx2OxQVFYFOpwOlUhkbHfy3VqsFs9kMjY2NMDw8DCsrK9F3a2tr6XNbsriem5sL2KRer2fWlcVigeLiYmYbHv3y8nLIy8vDz/flMHgRG6yurgaNRhOXPCcnBwYGBmJT2t/fDyaTKU6TmZkJVVVVUFBQgJ9vyjKCeHRw9Pb2xiXPz8+HycnJmMHp6WkoLCyM03R0dETbbDabbCM4UVJSAm1tbaBSqZjTiKcQj7DQ1oJXPGdQ8hrEt5gvNTU14HK5oLOzE3p6euJwu93gdDqhtbUVuru7/2rv6uqC9vZ2qK+vl2UVH8M15PF4olvIwsICk/n5+ShC7fjd0dFRfgZOSmUO/xIbUygUoFaro1tIMvB9oD6fifxcTShwJ4e50+SIRPB9qdL/JEzH/x5/AACs1FXqy4cMAAAAAElFTkSuQmCC","Q":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEvUlEQVR42u1YW0isVRQ+at6TNAdPoYl3JRVTxBuaYRGBPshBTbylL1Io4uVgDwZJqKBGeMHIDMU0VErBB7UxEjWPIoqpRwMxDPKGN7TI+2W1v82/ZWb8NdSZoQc/+PCf2d+/9tp7r73WGh89esADHqAzWN5C+6I+HTNh/Jpxg3GcMfQGrT/jCOMW47e3XNSd8ZmzszM1NzdTUlISsc9rjNYyOgvGxdjYWGppaSEvLy9ov9CHg7/m5+cTsLS0hEnBYBnd6xibmpri2pKSEuh+14eDXzo6OlJtbS3FxcVh0j8YX74m7n6Ljo7mWnd3d2hb9OEgjvMnaefAj2/QfqiiQyza6uuifO7j40MREREkXRTDa3Q/BwcHU0BAAHTf6PMmj6Wnp9Pk5KTYnScymncwNjg4SHl5edDMMxpoY/JAxBljOaOjzDji7e+Kigoe/GFhYZh8UkY34OvryzUNDQ3QnDC+JqN7zFjCWM8Y/l/OBTAehIaGkre3N4wuMb6ioXkTO9Pf388n7+3tFbsYo6KJxHdtbW1cMzY2JqcR8Tzn4eFB4eHhZGhoeCLZvxZ1QUFB3Ojh4SEpFAoY/UBDk2NpaUkrKyskEBgYCN0zFc2Pnp6edHp6ysd3d3fJ1tYWmk80bMXC1tbWFtdFRUVB892NSdjNzY2Wl5dpfHycrKysLmRW1IwLooquri6xQ0GMnnhuampS04SEhGC8W8PWG6ampmcDAwO0vr5OCAn2Xc1NDioYJ8zMzMjIyAjic8ZPNTTPU1JS1CY/Pz8nPz8/6HsYf8AiT05O1DRZWVkiZIxVbD1FbLKjJQsLC4w/vyZO1WDO+Dbj9yo5rF96EbX0n6qqKtJER0eH0FJ9ff2V8cbGRowdSzH9WNpN8Q4W9i6j1W1u80toCBwcHAhBLNVcNAk0NDR0xYGzszNycnLisXZwcHBlfHp6mgwMDEQ+XHJxceF69rzH+OpdU85HLA6pp6eHMjMz+WqNjY0vEPRyqKmpodLSUtkxXDobGxtuIzk5mWcB6XPhfXIi4mUhJiaGT4KjQ229Dri1mrGnivj4eKqsrOTPiYmJcO5Pqeu5F3g9nZiY4IaPj4/p4uKC7oKjoyP+d35+Xhz3U21UFgTuZkZGBmkL2dnZIvYU2qq9XyFp7+3t3du5/f19sre3h4Ot2mwOeOFHWVMFkiuCHf1ebm4upaWlcebk5FB1dTX19fXR6uqq2jvDw8MitcRq00E0nxuFhYW0sLBAxcXF5O/vTyp5jN9IpA5XV1dR1i6JClFUVERzc3Ois/5Lm8croGRl6XJSFPeysjK+I9vb22q3F887Ozs0MjJC5eXlFBkZefmeZOOZLnrABuwSOpSNjQ3Z+EJNVSqVsmNoCDo7O8nOzg4OtuvCwSokbfR2Il0ILC4uUkJCwuUu4RmhoArsamtrK1lbW0PTqJMdFA6kpqaqTT47Oyvaek60WqOjo3LNgqBOdlBpYmJCBQUFtLa2JnuMdXV1vFKgu9HE5uYmvyjm5uY6iUF0Meu4FPcFFqGLW/we+sP29nZ+nOhM7sKZmRnq7u5GwwEn39eWc/gl1oPaCcNoLu9DYYPZ/OWGn6u3Aoy8JVWTKC1R2Hrh4Z+ED/i/418jpjudlF+5UQAAAABJRU5ErkJggg==","r":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABzklEQVR42u2XPUvDUBSGDTRpiyCioDi46CAIgihCN1FJF6uOUhD1B4hLnV1EFxERB7VDB3Up1C/E2K5CBxdtQ6GIiBXcbC2Ig4h6PIEbKOGCtfce6JAXnukdzgPJPblpaHDjxo2busg2coYcMc6RGdZpyA5y6ujHWd+C7CMnjn5MpuADAg42WaciRU4fYX0b8sPp52UKXnEGbCA+pBUpcPol1ncjZU4/IVPwkjPAGnqPPCKfnL7I+ifki9OPyBRMcAaIMiRT8JBAsFem4KpkuXekQ6agH1mxT6OiKOD1ekHTtKrweDyVcreyH29lgtbLHw6HoVQqVU06nQZVVYHtQz/10r4JhUKQSqXAMIw/SSaTEIvFwOfzWYJT1HIqWxu1vnsL1ILWUn4REFymFuxiJ7BWwS1qwX7kW0DwgFpwWHD/GdSCk4KC19SCc4KCd4hCKRgRFHxGGikF1wQFy7K/wc7sCQp+ID2UgolAIACmaUI2m4VMJlMVuVwOotGoLdlHJTeLvOq6Dvl8/t/E43Fb8AJplynWhOxKvg9a/zB6Pd+mbQZkCJqEgtMybtIFQsFFUcFO5I1QcF1UcJBQzuJYVLCZnbZRAoLs+ubGTV3nF+nlg7kw+H6AAAAAAElFTkSuQmCC","R":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADJUlEQVR42u2YXUhaYRjHs9I0aSwNpQ8pXLBYDcbWCCKyOVYXQ6Wr3Ywp1OXYjV5IH7sxB2FjLKltlzWhm/bFUK/bRbAIFyOIMWQGg4JqxZIUU589z+E1Rjd16n2hCx/4ccC/55yf57zveZ9jSUmxilWsYl2ICiKfkHeMz8hDlqmQV8jHY/l9luuQWeTDsfwuT8G4yWQCm80GfX19oNVqAT97wTIlst3c3Ax2ux2sViuoVCrK3Sw3IPnW1lZwOBzQ3d0NpaWllLt4Cn4ZGBiAQrW0tNAJniNqRI8kxsbGpCydToPBYKDcw/IryO7MzIyUJxIJKC8vp9zGUzBKv54qn89DfX09nWAX+Yn8QjJDQ0NSvrOzA2q1mvJtlq8j2enpaSlfXl6mjLjDU3Cebh1VLpeDqakpGBkZOWJ4eBgWFhak/ODgACYmJo6y0dFRaRuLxaScvscEb/MUDLW3twOPikajBcFrPAX9SqVSuhJ0i89aS0tL0NbWRnJJpJanoAbx0Wy0WCywuroKqVQK9vf3TySZTMLe3h5MTk4WxuY33rf3/+plgx+qqqpAo9GcCD2SaMtu6yz7sUIr1tnZCT6f79R4PB6oqKggQYdoOXoor4+Pj8sef0ajkQQfixakh/JWMBiUJXd4eAiNjY0k+FS0oJlmYCgUkn0FaanDfV+KFryB5MLhsGzBrq4uEnwrWtBCs3FxcVG2IDUSuG9EtKC9rKwM1tbWZAu6XC4S/Cpa0FlZWQmbm5uyBd1uNwn+QBQiBd01NTXSCiG3/H4/Cf5GtCIFn5nNZshms7IFqd1iLVqtSME3HR0dZ2oUIpEICaaRqyIF5/V6vTTgnU7nqRkcHISenp7CenxdlNwj5I9Op4OmpiZoaGiQBe3DBMOIkafYJeQ1Hby/vx82NjbO3A/Ozc1BdXU1SSaQe9y6aerjAoEAl46anqE0jtnVvMlD8DuNI54Vj8eBOnQ89gMenfTRKyWvymQyQJMNj/3kvIIm5K/X65Xa/JWVFS7Qq2ddXR0JBs4reIvGCv0TQGswbXmhUChI8P15BS+z2WYVQC9r34pVrAtd/wCkmK79XfCowgAAAABJRU5ErkJggg=="};

const asciiHorzLine = `${'+---'.repeat(8)}+\n`;
const asciiVertline = `${'| . '.repeat(8)}|\n`;
const asciiRow = `${asciiHorzLine}${asciiVertline}`;
const asciiBoard = `${asciiRow.repeat(8)}${asciiHorzLine}`

const svg_figures = {
p: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.4 69.6 48.5 88H96c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L80 400H240L227.5 287.8c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32h-8.5zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H281.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L256 432H64L22.6 473.4z"/></svg>',
P: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M232 152A72 72 0 1 0 88 152a72 72 0 1 0 144 0zm24 120H243.4l10.7 80H205.7L195 272H160 125l-10.7 80H65.9l10.7-80H64c-13.3 0-24-10.7-24-24s10.7-24 24-24c-15.1-20.1-24-45-24-72C40 85.7 93.7 32 160 32s120 53.7 120 120c0 27-8.9 51.9-24 72c13.3 0 24 10.7 24 24s-10.7 24-24 24zM52.7 464H267.3l-16.6-32H69.2L52.7 464zm207.9-80c12 0 22.9 6.7 28.4 17.3l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8H40.8C18.2 512 0 493.8 0 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C36.5 390.7 47.5 384 59.5 384h201z"/></svg>',
n: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5V238.9c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400H384l28.9-159c2.1-11.3 3.1-22.8 3.1-34.3V192C416 86 330 0 224 0H83.8C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432H64L22.6 473.4z"/></svg>',
N: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M226.6 48H117.3l17.1 12.8c6 4.5 9.6 11.6 9.6 19.2s-3.6 14.7-9.6 19.2l-6.5 4.9c-10 7.5-16 19.3-16 31.9l-.3 91c0 10.2 4.9 19.9 13.2 25.8l1.9 1.3c9.9 7.1 23.3 7 33.2-.1l49.9-36.3c10.7-7.8 25.7-5.4 33.5 5.3s5.4 25.7-5.3 33.5l-49.9 36.3-53.8 39.1c-7.3 5.3-13 12.2-16.9 20.1H66.8c5.3-22.1 17.8-41.9 35.9-56.3c-1.3-.8-2.6-1.7-3.8-2.6L97 291.8c-21-15-33.4-39.2-33.3-65l.3-91c.1-19.8 6.7-38.7 18.6-53.9l-.4-.3C70.7 73 64 59.6 64 45.3C64 20.3 84.3 0 109.3 0H226.6C331.2 0 416 84.8 416 189.4c0 11.1-1 22.2-2.9 33.2L390.1 352H341.3l24.5-137.8c1.5-8.2 2.2-16.5 2.2-24.8C368 111.3 304.7 48 226.6 48zM85.2 432L68.7 464H379.3l-16.6-32H85.2zm315.7-30.7l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8H56.8C34.2 512 16 493.8 16 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C52.5 390.7 63.5 384 75.5 384h297c12 0 22.9 6.7 28.4 17.3zM172 128a20 20 0 1 1 0 40 20 20 0 1 1 0-40z"/></svg>',
b: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7V400H256V372.7c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32H128zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512H297.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432H48z"/></svg>',
B: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M104 0C90.7 0 80 10.7 80 24c0 11.2 7.6 20.6 18 23.2c-7.8 8-16.1 17-24.4 27C38.2 116.7 0 178.8 0 250.9c0 44.8 24.6 72.2 48 87.8V352H96V325c0-9-5-17.2-13-21.3c-18-9.3-35-24.7-35-52.7c0-55.5 29.8-106.8 62.4-145.9c16-19.2 32.1-34.8 44.2-45.5c1.9-1.7 3.7-3.2 5.3-4.6c1.7 1.4 3.4 3 5.3 4.6c12.1 10.7 28.2 26.3 44.2 45.5c5.3 6.3 10.5 13 15.5 20L159 191c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l57.8-57.8c12.8 25.9 21.2 54.3 21.2 83.8c0 28-17 43.4-35 52.7c-8 4.1-13 12.3-13 21.3v27h48V338.7c23.4-15.6 48-42.9 48-87.8c0-72.1-38.2-134.2-73.6-176.7c-8.3-9.9-16.6-19-24.4-27c10.3-2.7 18-12.1 18-23.2c0-13.3-10.7-24-24-24H160 104zM52.7 464l16.6-32H250.8l16.6 32H52.7zm207.9-80H59.5c-12 0-22.9 6.7-28.4 17.3L4.6 452.5c-3 5.8-4.6 12.2-4.6 18.7C0 493.8 18.2 512 40.8 512H279.2c22.5 0 40.8-18.2 40.8-40.8c0-6.5-1.6-12.9-4.6-18.7l-26.5-51.2c-5.5-10.6-16.5-17.3-28.4-17.3z"/></svg>',
r: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg>',
R: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M80 80V192c0 2.5 1.2 4.9 3.2 6.4l51.2 38.4c6.8 5.1 10.4 13.4 9.5 21.9L133.5 352H85.2l9.4-85L54.4 236.8C40.3 226.2 32 209.6 32 192V72c0-22.1 17.9-40 40-40H376c22.1 0 40 17.9 40 40V192c0 17.6-8.3 34.2-22.4 44.8L353.4 267l9.4 85H314.5l-10.4-93.3c-.9-8.4 2.7-16.8 9.5-21.9l51.2-38.4c2-1.5 3.2-3.9 3.2-6.4V80H304v24c0 13.3-10.7 24-24 24s-24-10.7-24-24V80H192v24c0 13.3-10.7 24-24 24s-24-10.7-24-24V80H80zm4.7 384H363.3l-16.6-32H101.2L84.7 464zm271.9-80c12 0 22.9 6.7 28.4 17.3l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8H72.8C50.2 512 32 493.8 32 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C68.5 390.7 79.5 384 91.5 384h265zM208 288c-8.8 0-16-7.2-16-16V224c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 8.8-7.2 16-16 16H208z"/></svg>',
q: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400H384 343.6 168.4 128 112.3L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224l0 0 0 0h0zM112 432H400l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H86.6C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z"/></svg>',
Q: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-95.2-8c-18.1 0-31.3 12.8-35.6 26.9c-8 26.2-32.4 45.2-61.2 45.2c-10 0-19.4-2.3-27.7-6.3c-7.6-3.7-16.7-3.3-24 1.2C.7 162.1-3.1 177.1 3.7 188.9L97.6 352H153l-83-144.1c40.5-2.2 75.3-25.9 93.1-59.8c22 26.8 55.4 43.9 92.8 43.9s70.8-17.1 92.8-43.9c17.8 34 52.6 57.7 93.1 59.8L359 352h55.4l93.9-163.1c6.8-11.7 3-26.7-8.6-33.8c-7.3-4.5-16.4-4.9-24-1.2c-8.4 4-17.7 6.3-27.7 6.3c-28.8 0-53.2-19-61.2-45.2C382.5 100.8 369.3 88 351.2 88c-14.5 0-26.3 8.5-32.4 19.3c-12.4 22-35.9 36.7-62.8 36.7s-50.4-14.8-62.8-36.7C187.1 96.5 175.4 88 160.8 88zM133.2 432H378.8l16.6 32H116.7l16.6-32zm283.7-30.7c-5.5-10.6-16.5-17.3-28.4-17.3h-265c-12 0-22.9 6.7-28.4 17.3L68.6 452.5c-3 5.8-4.6 12.2-4.6 18.7c0 22.5 18.2 40.8 40.8 40.8H407.2c22.5 0 40.8-18.2 40.8-40.8c0-6.5-1.6-12.9-4.6-18.7l-26.5-51.2z"/></svg>',
k: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c17.7 0 32 14.3 32 32V48h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H256v48H408c22.1 0 40 17.9 40 40c0 5.3-1 10.5-3.1 15.4L368 400H80L3.1 215.4C1 210.5 0 205.3 0 200c0-22.1 17.9-40 40-40H192V112H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V32c0-17.7 14.3-32 32-32zM38.6 473.4L80 432H368l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H54.6C42.1 512 32 501.9 32 489.4c0-6 2.4-11.8 6.6-16z"/></svg>',
K: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M248 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V56H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h32v40H59.6C26.7 144 0 170.7 0 203.6c0 8.2 1.7 16.3 4.9 23.8L59.1 352h52.3L49 208.2c-.6-1.5-1-3-1-4.6c0-6.4 5.2-11.6 11.6-11.6H224 388.4c6.4 0 11.6 5.2 11.6 11.6c0 1.6-.3 3.2-1 4.6L336.5 352h52.3l54.2-124.6c3.3-7.5 4.9-15.6 4.9-23.8c0-32.9-26.7-59.6-59.6-59.6H248V104h32c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V24zM101.2 432H346.8l16.6 32H84.7l16.6-32zm283.7-30.7c-5.5-10.6-16.5-17.3-28.4-17.3H91.5c-12 0-22.9 6.7-28.4 17.3L36.6 452.5c-3 5.8-4.6 12.2-4.6 18.7C32 493.8 50.2 512 72.8 512H375.2c22.5 0 40.8-18.2 40.8-40.8c0-6.5-1.6-12.9-4.6-18.7l-26.5-51.2z"/></svg>',
}

const blackFigures = ["r","n","b","q","k","p"];
const whiteFigures = ["R","N","B","Q","K", "P"];
const figures = blackFigures.concat(whiteFigures).concat(['0']);
const rowArray = [0, 1, 2, 3, 4, 5, 6, 7];
const colArray = [0, 1, 2, 3, 4, 5, 6, 7];

const resultRegex = /(?<ONGOING>^\*$)|(?<WHITE_WIN>^1-0$)|(?<BLACK_WIN>^0-1$)|(?<DRAW>^1\/2-1\/2$)/;
const headerRegex = /^\[(?<header>\w+)\s+"(?<value>[a-zA-Z\.\,\/\s\d\?\!\-\_]*)"\]$/;
const algebraicRegex = /^[a-h][1-8][a-h][1-8][QqRrBbNn]?$/;
const regexFigure = /^(?<figure>[NBRQK])(?<disambig>[a-h]?[1-8]?)?[x]?(?<to>[a-h][1-8])[\+\#\!\?]*$/;
const regexPawn = /^(?<column>[a-h]?)?[x]?[x]?(?<to>[a-h][1-8])(?<promotion>\=?[QRBN]?)?[\+\#\!\?]*$/;
const regexCastling = /^[O0]-[O0](?<longCastling>-[O0])?[\+\#\!\?]*$/;

const defaultFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const emptyFen = "8/8/8/8/8/8/8/8 w KQkq - 0 1";
const frenchFen = 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
const sicilianFen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
const caroKanFen = 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
const smotheredFen = '4k3/4P3/3K4/8/8/8/8/8 w - - 1 50';
const helpedMateFen = 'r1bqkbnr/pppnpppp/7P/3p4/8/8/PPPPPPP1/RNBQKBNR b KQkq - 0 3';
const KnightandBishopFen = '4k3/8/8/8/8/8/8/N3K2B w - - 0 1';
const mateIn3Fen = '3krn2/p1p1p3/3n4/2N2b1q/Q7/6p1/4P1P1/1R4K1 w - - 0 1';

const evergreen_json = '{"fens":["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1","rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2","rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2","r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3","r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3","r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4","r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4","r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/5N2/P1PP1PPP/RNBQK2R w KQkq - 0 5","r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/2P2N2/P2P1PPP/RNBQK2R b KQkq - 0 5","r1bqk1nr/pppp1ppp/2n5/b3p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R w KQkq - 1 6","r1bqk1nr/pppp1ppp/2n5/b3p3/2BPP3/2P2N2/P4PPP/RNBQK2R b KQkq d3 0 6","r1bqk1nr/pppp1ppp/2n5/b7/2BpP3/2P2N2/P4PPP/RNBQK2R w KQkq - 0 7","r1bqk1nr/pppp1ppp/2n5/b7/2BpP3/2P2N2/P4PPP/RNBQ1RK1 b kq - 1 7","r1bqk1nr/pppp1ppp/2n5/b7/2B1P3/2Pp1N2/P4PPP/RNBQ1RK1 w kq - 0 8","r1bqk1nr/pppp1ppp/2n5/b7/2B1P3/1QPp1N2/P4PPP/RNB2RK1 b kq - 1 8","r1b1k1nr/pppp1ppp/2n2q2/b7/2B1P3/1QPp1N2/P4PPP/RNB2RK1 w kq - 2 9","r1b1k1nr/pppp1ppp/2n2q2/b3P3/2B5/1QPp1N2/P4PPP/RNB2RK1 b kq - 0 9","r1b1k1nr/pppp1ppp/2n3q1/b3P3/2B5/1QPp1N2/P4PPP/RNB2RK1 w kq - 1 10","r1b1k1nr/pppp1ppp/2n3q1/b3P3/2B5/1QPp1N2/P4PPP/RNB1R1K1 b kq - 2 10","r1b1k2r/ppppnppp/2n3q1/b3P3/2B5/1QPp1N2/P4PPP/RNB1R1K1 w kq - 3 11","r1b1k2r/ppppnppp/2n3q1/b3P3/2B5/BQPp1N2/P4PPP/RN2R1K1 b kq - 4 11","r1b1k2r/p1ppnppp/2n3q1/bp2P3/2B5/BQPp1N2/P4PPP/RN2R1K1 w kq b6 0 12","r1b1k2r/p1ppnppp/2n3q1/bQ2P3/2B5/B1Pp1N2/P4PPP/RN2R1K1 b kq - 0 12","1rb1k2r/p1ppnppp/2n3q1/bQ2P3/2B5/B1Pp1N2/P4PPP/RN2R1K1 w k - 1 13","1rb1k2r/p1ppnppp/2n3q1/b3P3/Q1B5/B1Pp1N2/P4PPP/RN2R1K1 b k - 2 13","1rb1k2r/p1ppnppp/1bn3q1/4P3/Q1B5/B1Pp1N2/P4PPP/RN2R1K1 w k - 3 14","1rb1k2r/p1ppnppp/1bn3q1/4P3/Q1B5/B1Pp1N2/P2N1PPP/R3R1K1 b k - 4 14","1r2k2r/pbppnppp/1bn3q1/4P3/Q1B5/B1Pp1N2/P2N1PPP/R3R1K1 w k - 5 15","1r2k2r/pbppnppp/1bn3q1/4P3/Q1B1N3/B1Pp1N2/P4PPP/R3R1K1 b k - 6 15","1r2k2r/pbppnppp/1bn5/4Pq2/Q1B1N3/B1Pp1N2/P4PPP/R3R1K1 w k - 7 16","1r2k2r/pbppnppp/1bn5/4Pq2/Q3N3/B1PB1N2/P4PPP/R3R1K1 b k - 0 16","1r2k2r/pbppnppp/1bn5/4P2q/Q3N3/B1PB1N2/P4PPP/R3R1K1 w k - 1 17","1r2k2r/pbppnppp/1bn2N2/4P2q/Q7/B1PB1N2/P4PPP/R3R1K1 b k - 2 17","1r2k2r/pbppnp1p/1bn2p2/4P2q/Q7/B1PB1N2/P4PPP/R3R1K1 w k - 0 18","1r2k2r/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/R3R1K1 b k - 0 18","1r2k1r1/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/R3R1K1 w - - 1 19","1r2k1r1/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/3RR1K1 b - - 2 19","1r2k1r1/pbppnp1p/1bn2P2/8/Q7/B1PB1q2/P4PPP/3RR1K1 w - - 0 20","1r2k1r1/pbppRp1p/1bn2P2/8/Q7/B1PB1q2/P4PPP/3R2K1 b - - 0 20","1r2k1r1/pbppnp1p/1b3P2/8/Q7/B1PB1q2/P4PPP/3R2K1 w - - 0 21","1r2k1r1/pbpQnp1p/1b3P2/8/8/B1PB1q2/P4PPP/3R2K1 b - - 0 21","1r4r1/pbpknp1p/1b3P2/8/8/B1PB1q2/P4PPP/3R2K1 w - - 0 22","1r4r1/pbpknp1p/1b3P2/5B2/8/B1P2q2/P4PPP/3R2K1 b - - 1 22","1r2k1r1/pbp1np1p/1b3P2/5B2/8/B1P2q2/P4PPP/3R2K1 w - - 2 23","1r2k1r1/pbpBnp1p/1b3P2/8/8/B1P2q2/P4PPP/3R2K1 b - - 3 23","1r3kr1/pbpBnp1p/1b3P2/8/8/B1P2q2/P4PPP/3R2K1 w - - 4 24","1r3kr1/pbpBBp1p/1b3P2/8/8/2P2q2/P4PPP/3R2K1 b - - 0 24"],"moves":[null,{"san":"e4","from":12,"to":28,"figure":"P","promotion":null,"number":"1"},{"san":"e5","from":52,"to":36,"figure":"p","promotion":null,"number":"1"},{"san":"Nf3","from":6,"to":21,"figure":"N","promotion":null,"number":"2"},{"san":"Nc6","from":57,"to":42,"figure":"n","promotion":null,"number":"2"},{"san":"Bc4","from":5,"to":26,"figure":"B","promotion":null,"number":"3"},{"san":"Bc5","from":61,"to":34,"figure":"b","promotion":null,"number":"3"},{"san":"b4","from":9,"to":25,"figure":"P","promotion":null,"number":"4"},{"san":"Bxb4","from":34,"to":25,"figure":"b","promotion":null,"number":"4"},{"san":"c3","from":10,"to":18,"figure":"P","promotion":null,"number":"5"},{"san":"Ba5","from":25,"to":32,"figure":"b","promotion":null,"number":"5"},{"san":"d4","from":11,"to":27,"figure":"P","promotion":null,"number":"6"},{"san":"exd4","from":36,"to":27,"figure":"p","promotion":null,"number":"6"},{"san":"O-O","from":4,"to":6,"figure":"K","promotion":null,"number":"7"},{"san":"d3","from":27,"to":19,"figure":"p","promotion":null,"number":"7"},{"san":"Qb3","from":3,"to":17,"figure":"Q","promotion":null,"number":"8"},{"san":"Qf6","from":59,"to":45,"figure":"q","promotion":null,"number":"8"},{"san":"e5","from":28,"to":36,"figure":"P","promotion":null,"number":"9"},{"san":"Qg6","from":45,"to":46,"figure":"q","promotion":null,"number":"9"},{"san":"Re1","from":5,"to":4,"figure":"R","promotion":null,"number":"10"},{"san":"Nge7","from":62,"to":52,"figure":"n","promotion":null,"number":"10"},{"san":"Ba3","from":2,"to":16,"figure":"B","promotion":null,"number":"11"},{"san":"b5","from":49,"to":33,"figure":"p","promotion":null,"number":"11"},{"san":"Qxb5","from":17,"to":33,"figure":"Q","promotion":null,"number":"12"},{"san":"Rb8","from":56,"to":57,"figure":"r","promotion":null,"number":"12"},{"san":"Qa4","from":33,"to":24,"figure":"Q","promotion":null,"number":"13"},{"san":"Bb6","from":32,"to":41,"figure":"b","promotion":null,"number":"13"},{"san":"Nbd2","from":1,"to":11,"figure":"N","promotion":null,"number":"14"},{"san":"Bb7","from":58,"to":49,"figure":"b","promotion":null,"number":"14"},{"san":"Ne4","from":11,"to":28,"figure":"N","promotion":null,"number":"15"},{"san":"Qf5","from":46,"to":37,"figure":"q","promotion":null,"number":"15"},{"san":"Bxd3","from":26,"to":19,"figure":"B","promotion":null,"number":"16"},{"san":"Qh5","from":37,"to":39,"figure":"q","promotion":null,"number":"16"},{"san":"Nf6+","from":28,"to":45,"figure":"N","promotion":null,"number":"17"},{"san":"gxf6","from":54,"to":45,"figure":"p","promotion":null,"number":"17"},{"san":"exf6","from":36,"to":45,"figure":"P","promotion":null,"number":"18"},{"san":"Rg8","from":63,"to":62,"figure":"r","promotion":null,"number":"18"},{"san":"Rad1","from":0,"to":3,"figure":"R","promotion":null,"number":"19"},{"san":"Qxf3","from":39,"to":21,"figure":"q","promotion":null,"number":"19"},{"san":"Rxe7+","from":4,"to":52,"figure":"R","promotion":null,"number":"20"},{"san":"Nxe7","from":42,"to":52,"figure":"n","promotion":null,"number":"20"},{"san":"Qxd7+","from":24,"to":51,"figure":"Q","promotion":null,"number":"21"},{"san":"Kxd7","from":60,"to":51,"figure":"k","promotion":null,"number":"21"},{"san":"Bf5+","from":19,"to":37,"figure":"B","promotion":null,"number":"22"},{"san":"Ke8","from":51,"to":60,"figure":"k","promotion":null,"number":"22"},{"san":"Bd7+","from":37,"to":51,"figure":"B","promotion":null,"number":"23"},{"san":"Kf8","from":60,"to":61,"figure":"k","promotion":null,"number":"23"},{"san":"Bxe7#","from":16,"to":52,"figure":"B","promotion":null,"number":"24"}]}';
const evergreen_pgn = `[Event "Informal game"]\n[Site "Berlin"]\n[Date "1852.??.??"]\n[Round "?"]\n[White "Anderssen, Adolf"]\n[Black "Dufresne, Jean"]\n[Result "1-0"]\n[Termination "Checkmate"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O d3 8. Qb3 Qf6 9. e5 Qg6 10. Re1 Nge7 11. Ba3 b5 12. Qxb5 Rb8 13. Qa4 Bb6 14. Nbd2 Bb7 15. Ne4 Qf5 16. Bxd3 Qh5 17. Nf6+ gxf6 18. exf6 Rg8 19. Rad1 Qxf3 20. Rxe7+ Nxe7 21. Qxd7+ Kxd7 22. Bf5+ Ke8 23. Bd7+ Kf8 24. Bxe7# 1-0\n\n`
const inmortal_json = '{"fens":["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1","rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2","rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2","rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3","rnbqkbnr/pppp1ppp/8/8/2B1Pp2/8/PPPP2PP/RNBQK1NR b KQkq - 1 3","rnb1kbnr/pppp1ppp/8/8/2B1Pp1q/8/PPPP2PP/RNBQK1NR w KQkq - 2 4","rnb1kbnr/pppp1ppp/8/8/2B1Pp1q/8/PPPP2PP/RNBQ1KNR b kq - 3 4","rnb1kbnr/p1pp1ppp/8/1p6/2B1Pp1q/8/PPPP2PP/RNBQ1KNR w kq b6 0 5","rnb1kbnr/p1pp1ppp/8/1B6/4Pp1q/8/PPPP2PP/RNBQ1KNR b kq - 0 5","rnb1kb1r/p1pp1ppp/5n2/1B6/4Pp1q/8/PPPP2PP/RNBQ1KNR w kq - 1 6","rnb1kb1r/p1pp1ppp/5n2/1B6/4Pp1q/5N2/PPPP2PP/RNBQ1K1R b kq - 2 6","rnb1kb1r/p1pp1ppp/5n1q/1B6/4Pp2/5N2/PPPP2PP/RNBQ1K1R w kq - 3 7","rnb1kb1r/p1pp1ppp/5n1q/1B6/4Pp2/3P1N2/PPP3PP/RNBQ1K1R b kq - 0 7","rnb1kb1r/p1pp1ppp/7q/1B5n/4Pp2/3P1N2/PPP3PP/RNBQ1K1R w kq - 1 8","rnb1kb1r/p1pp1ppp/7q/1B5n/4Pp1N/3P4/PPP3PP/RNBQ1K1R b kq - 2 8","rnb1kb1r/p2p1ppp/2p4q/1B5n/4Pp1N/3P4/PPP3PP/RNBQ1K1R w kq - 0 9","rnb1kb1r/p2p1ppp/2p4q/1B3N1n/4Pp2/3P4/PPP3PP/RNBQ1K1R b kq - 1 9","rnb1kb1r/p2p1ppp/2p5/1B3Nqn/4Pp2/3P4/PPP3PP/RNBQ1K1R w kq - 2 10","rnb1kb1r/p2p1ppp/2p5/1B3Nqn/4PpP1/3P4/PPP4P/RNBQ1K1R b kq g3 0 10","rnb1kb1r/p2p1ppp/2p2n2/1B3Nq1/4PpP1/3P4/PPP4P/RNBQ1K1R w kq - 1 11","rnb1kb1r/p2p1ppp/2p2n2/1B3Nq1/4PpP1/3P4/PPP4P/RNBQ1KR1 b kq - 2 11","rnb1kb1r/p2p1ppp/5n2/1p3Nq1/4PpP1/3P4/PPP4P/RNBQ1KR1 w kq - 0 12","rnb1kb1r/p2p1ppp/5n2/1p3Nq1/4PpPP/3P4/PPP5/RNBQ1KR1 b kq h3 0 12","rnb1kb1r/p2p1ppp/5nq1/1p3N2/4PpPP/3P4/PPP5/RNBQ1KR1 w kq - 1 13","rnb1kb1r/p2p1ppp/5nq1/1p3N1P/4PpP1/3P4/PPP5/RNBQ1KR1 b kq - 0 13","rnb1kb1r/p2p1ppp/5n2/1p3NqP/4PpP1/3P4/PPP5/RNBQ1KR1 w kq - 1 14","rnb1kb1r/p2p1ppp/5n2/1p3NqP/4PpP1/3P1Q2/PPP5/RNB2KR1 b kq - 2 14","rnb1kbnr/p2p1ppp/8/1p3NqP/4PpP1/3P1Q2/PPP5/RNB2KR1 w kq - 3 15","rnb1kbnr/p2p1ppp/8/1p3NqP/4PBP1/3P1Q2/PPP5/RN3KR1 b kq - 0 15","rnb1kbnr/p2p1ppp/5q2/1p3N1P/4PBP1/3P1Q2/PPP5/RN3KR1 w kq - 1 16","rnb1kbnr/p2p1ppp/5q2/1p3N1P/4PBP1/2NP1Q2/PPP5/R4KR1 b kq - 2 16","rnb1k1nr/p2p1ppp/5q2/1pb2N1P/4PBP1/2NP1Q2/PPP5/R4KR1 w kq - 3 17","rnb1k1nr/p2p1ppp/5q2/1pbN1N1P/4PBP1/3P1Q2/PPP5/R4KR1 b kq - 4 17","rnb1k1nr/p2p1ppp/8/1pbN1N1P/4PBP1/3P1Q2/PqP5/R4KR1 w kq - 0 18","rnb1k1nr/p2p1ppp/3B4/1pbN1N1P/4P1P1/3P1Q2/PqP5/R4KR1 b kq - 1 18","rnb1k1nr/p2p1ppp/3B4/1p1N1N1P/4P1P1/3P1Q2/PqP5/R4Kb1 w kq - 0 19","rnb1k1nr/p2p1ppp/3B4/1p1NPN1P/6P1/3P1Q2/PqP5/R4Kb1 b kq - 0 19","rnb1k1nr/p2p1ppp/3B4/1p1NPN1P/6P1/3P1Q2/P1P5/q4Kb1 w kq - 0 20","rnb1k1nr/p2p1ppp/3B4/1p1NPN1P/6P1/3P1Q2/P1P1K3/q5b1 b kq - 1 20","r1b1k1nr/p2p1ppp/n2B4/1p1NPN1P/6P1/3P1Q2/P1P1K3/q5b1 w kq - 2 21","r1b1k1nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1 b kq - 0 21","r1bk2nr/p2p1pNp/n2B4/1p1NP2P/6P1/3P1Q2/P1P1K3/q5b1 w - - 1 22","r1bk2nr/p2p1pNp/n2B1Q2/1p1NP2P/6P1/3P4/P1P1K3/q5b1 b - - 2 22","r1bk3r/p2p1pNp/n2B1n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1 w - - 0 23","r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1 b - - 1 23"],"moves":[null,{"san":"e4","from":12,"to":28,"figure":"P","promotion":null,"number":"1"},{"san":"e5","from":52,"to":36,"figure":"p","promotion":null,"number":"1"},{"san":"f4","from":13,"to":29,"figure":"P","promotion":null,"number":"2"},{"san":"exf4","from":36,"to":29,"figure":"p","promotion":"","number":"2"},{"san":"Bc4","from":5,"to":26,"figure":"B","promotion":null,"number":"3"},{"san":"Qh4+","from":59,"to":31,"figure":"q","promotion":null,"number":"3"},{"san":"Kf1","from":4,"to":5,"figure":"K","promotion":null,"number":"4"},{"san":"b5","from":49,"to":33,"figure":"p","promotion":null,"number":"4"},{"san":"Bxb5","from":26,"to":33,"figure":"B","promotion":null,"number":"5"},{"san":"Nf6","from":62,"to":45,"figure":"n","promotion":null,"number":"5"},{"san":"Nf3","from":6,"to":21,"figure":"N","promotion":null,"number":"6"},{"san":"Qh6","from":31,"to":47,"figure":"q","promotion":null,"number":"6"},{"san":"d3","from":11,"to":19,"figure":"P","promotion":null,"number":"7"},{"san":"Nh5","from":45,"to":39,"figure":"n","promotion":null,"number":"7"},{"san":"Nh4","from":21,"to":31,"figure":"N","promotion":null,"number":"8"},{"san":"c6","from":50,"to":42,"figure":"p","promotion":null,"number":"8"},{"san":"Nf5","from":31,"to":37,"figure":"N","promotion":null,"number":"9"},{"san":"Qg5","from":47,"to":38,"figure":"q","promotion":null,"number":"9"},{"san":"g4","from":14,"to":30,"figure":"P","promotion":null,"number":"10"},{"san":"Nf6","from":39,"to":45,"figure":"n","promotion":null,"number":"10"},{"san":"Rg1","from":7,"to":6,"figure":"R","promotion":null,"number":"11"},{"san":"cxb5","from":42,"to":33,"figure":"p","promotion":"","number":"11"},{"san":"h4","from":15,"to":31,"figure":"P","promotion":null,"number":"12"},{"san":"Qg6","from":38,"to":46,"figure":"q","promotion":null,"number":"12"},{"san":"h5","from":31,"to":39,"figure":"P","promotion":null,"number":"13"},{"san":"Qg5","from":46,"to":38,"figure":"q","promotion":null,"number":"13"},{"san":"Qf3","from":3,"to":21,"figure":"Q","promotion":null,"number":"14"},{"san":"Ng8","from":45,"to":62,"figure":"n","promotion":null,"number":"14"},{"san":"Bxf4","from":2,"to":29,"figure":"B","promotion":null,"number":"15"},{"san":"Qf6","from":38,"to":45,"figure":"q","promotion":null,"number":"15"},{"san":"Nc3","from":1,"to":18,"figure":"N","promotion":null,"number":"16"},{"san":"Bc5","from":61,"to":34,"figure":"b","promotion":null,"number":"16"},{"san":"Nd5","from":18,"to":35,"figure":"N","promotion":null,"number":"17"},{"san":"Qxb2","from":45,"to":9,"figure":"q","promotion":null,"number":"17"},{"san":"Bd6","from":29,"to":43,"figure":"B","promotion":null,"number":"18"},{"san":"Bxg1","from":34,"to":6,"figure":"b","promotion":null,"number":"18"},{"san":"e5","from":28,"to":36,"figure":"P","promotion":null,"number":"19"},{"san":"Qxa1+","from":9,"to":0,"figure":"q","promotion":null,"number":"19"},{"san":"Ke2","from":5,"to":12,"figure":"K","promotion":null,"number":"20"},{"san":"Na6","from":57,"to":40,"figure":"n","promotion":null,"number":"20"},{"san":"Nxg7+","from":37,"to":54,"figure":"N","promotion":null,"number":"21"},{"san":"Kd8","from":60,"to":59,"figure":"k","promotion":null,"number":"21"},{"san":"Qf6+","from":21,"to":45,"figure":"Q","promotion":null,"number":"22"},{"san":"Nxf6","from":62,"to":45,"figure":"n","promotion":null,"number":"22"},{"san":"Be7#","from":43,"to":52,"figure":"B","promotion":null,"number":"23"}]}';
const inmortal_pgn = `[Event "Informal game"]\n[Site "London"]\n[Date "1851.??.??"]\n[Round "?"]\n[White "Anderssen, Adolf"]\n[Black "Kieseritzky, Lionel Adalbert Bagration Felix"]\n[Result "1-0"]\n[Termination "Checkmate"]\n\n1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 c6 9. Nf5 Qg5 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7# 1-0`

const boardColors = {
    blue: {
        light: "#add8e6",
        dark: "steelblue"
    },
    acqua: {
        light: "#dfdfdf",
        dark: "#56b6e2"
    },
    green: {
        light: "#f5f5dc",
        dark: "#769656"
    }
};


const MoveEvaluation = {
    INCOMPLETE_INFO: -1,
    INVALID_MOVE: 0,
    VALID_MOVE: 1
}

const GameResults = {
        ONGOING: '*',
        WHITE_WIN: '1-0',
        BLACK_WIN: '0-1',
        DRAW: '1/2-1/2'
}

const MoveSteps = {
    COLUMN: 1,
    ROW: 8,
    ANTI_DIAGONAL: 7,
    DIAGONAL: 9
}

const seven_tag_roster = ['event','site','date','round','white','black','result'];


//////////////

const pad = (str, len = 2, padchar = '0', padLeft = true) => {
    const dif = len - str.toString().length;
    if (dif <= 0) return str;
    return padLeft === true ? `${padchar.repeat(dif)}${str}` : `${str}${padchar.repeat(dif)}` 
}

const isOdd = number => (number % 2) !== 0
const isEven = number => !isOdd(number)
const capitalize = str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
const title = str => str.split(/\s+/g).map(capitalize).join(' ')

const rowcol2name = (row, col) => `${String.fromCharCode(col + 97)}${String.fromCharCode(row + 49)}`
const name2rowcol = name => ({row: name.charCodeAt(1) - 49, col: name.charCodeAt(0) - 97})
const square2san = index => {
    const rowcol = index2rowcol(index);
    return rowcol2name(rowcol.row, rowcol.col);
}
const san2square = san => (san.charCodeAt(0) - 97) + ((san.charCodeAt(1) - 49) * 8);
const rowFromIndex = index => Math.floor(index / 8)
const colFromIndex = index => index % 8
const index2rowcol = index => ({ row: rowFromIndex(index), col: colFromIndex(index)})
const rowcol2index = (row, col) => row * 8 + col
const colLetterFromIndex = index => String.fromCharCode(colFromIndex(index) + 97)
const rowNumberFromIndex = index => `${rowFromIndex(index) + 1}`

const isDarkSquare = index => {
    if (typeof(index) === 'string') {
        const {row, col} = name2rowcol(index);
        index = rowcol2index(row, col);
    }
    return (isEven(rowFromIndex(index)) && isEven(colFromIndex(index))) || 
    (isOdd(rowFromIndex(index)) && isOdd(colFromIndex(index))); 
}

const isLightSquare = index => !isDarkSquare(index) 

const fen2obj = fen => {
const [fenPos, activeColor, castling, enPassant, halfMoveClock, fullMoveNumber] = fen.split(/\s+/g);
return {fenPos, activeColor, castling, enPassant, halfMoveClock, fullMoveNumber};
}

const obj2fen = obj => { 
return `${obj.fenPos} ${obj.activeColor} ${obj.castling} ${obj.enPassant} ${obj.halfMoveClock} ${obj.fullMoveNumber}`;
}

const fenPos2short = fenpos => {
return fenpos.replace(/(\w{8})(?!$)/g, "$1/").replace(/(0+)/g, z => z.length.toString());    
} 

const fenPos2long = fenpos => {
return fenpos.replace(/\//g, "").replace(/(\d)/g, d => "0".repeat(parseInt(d)));    
} 

const rPosFromFen = fen => "0".repeat(64).split('').map((v, i) => v = fenPos2long(fen2obj(fen).fenPos)[i ^ 56]).join('')
const activeColorFromFen = fen => fen2obj(fen).activeColor

const pgnDate = (date = new Date()) => `${pad(date.getFullYear(), 4)}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`


//////////////


class ChessValidator {
    constructor(fen = defaultFen, debug = false, mode = 'strict') {
        this.fens = [fen];
        this.moves = [null];
        this.debug = debug;
        this.mode = mode;
    }

    reset(fen = this.fens[0]) {
        this.fens = [fen];
        this.moves = [null];
        this.headers && (this.headers.result = GameResults.ONGOING);
        this.headers && (this.headers.termination = '');

    }

    toHtml() {
        let retStr = '';
        if (this.headers) {
            for (let n = 0; n < seven_tag_roster.length; n += 1) {
                retStr += `<div style="margin: 0;">[<span>${capitalize(seven_tag_roster[n])}</span>&nbsp;&nbsp;&nbsp;<span style="color: green;">${this.headers[seven_tag_roster[n]] || '*'}</span>]</div>`;
            }
            for(let h in this.headers) {
                if (!seven_tag_roster.includes(h)) {
                    retStr += `<div style="margin: 0;">[<span>${capitalize(h)}</span>&nbsp;&nbsp;&nbsp;<span style="color: green;">${this.headers[h]}</span>]</div>`;
                }
            }
        }
        retStr += `<p>&nbsp;</p><div style="display: flex; flex-direction: row; flex-wrap: wrap;">`;
        const len  = this.moves.length;
        for (let n = 0; n < len; n += 1) {
            if (this.moves[n] === null) {
                retStr += `<span class="san" title="${n}">&nbsp;&nbsp;&nbsp;</span>`;
            } else {
                const content = `${this.sansInfo[n - 1].moveColor === 'w' ? (this.moves[n].number + '. ') : ' '}${this.moves[n].san} `;
                retStr += `<span class="san" title="${n}">${content}&nbsp;</span>`;
            }
        }
        retStr += `&nbsp;<span>${this.headers && this.headers.result ? this.headers.result : '*'}</span></div>`;
        return retStr;
    }

    toPgn() {
        let retStr = '';
        if (this.headers) {
            for (let n = 0; n < seven_tag_roster.length; n += 1) {
                retStr += `[${capitalize(seven_tag_roster[n])} "${this.headers[seven_tag_roster[n]] || '*'}"]\n`;
            }
            for(let h in this.headers) {
                if (!seven_tag_roster.includes(h)) {
                    retStr += `[${capitalize(h)} "${this.headers[h] || '*'}"]\n`;
                }
            }
        }
        retStr += `\n${this.moveStr} ${this.headers && this.headers.result ? this.headers.result : '*'}\n\n`
        return retStr;
    }

    undo() {
        if (this.fens.length < 2) return;
        this.fens.splice(this.fens.length - 1);
        this.moves.splice(this.moves.length -1);
    }

    appendMove(move) {
        this.moves.push(move);
    }

    appendFen(newFen) {
        this.fens.push(newFen);
    }

    get fen() {
        return this.fens[this.fens.length -1];
    }

    sanLongNumber = sanInfo => `${sanInfo.number}.${sanInfo.moveColor === 'b' ? '.. ' : ' '}${sanInfo.san}`
    sanShortNumber = sanInfo => sanInfo.moveColor === 'w' ? `${sanInfo.number}. ${sanInfo.san}` : `${sanInfo.san}` 

    get sansList() {
        return this.sansInfo.map((si, n) => n === 0 ? (si.moveColor === 'b' ? this.sanLongNumber(si) : this.sanShortNumber(si)) : this.sanShortNumber(si));
    }

    get moveStr() {
        return this.sansList.join(' ');
    }

    get sansInfo() {
        return this.moves.map(
            (o, i) => o ? 
                {san: o.san, 
                    moveColor: fen2obj(board.fens[i - 1]).activeColor, 
                    number: fen2obj(board.fens[i - 1]).fullMoveNumber} : 
                {}).slice(1);
    }

    get sans() {
        return this.sansInfo.map(o => o.san);
    }
    
    get algebraics() {
        return this.moves.slice(1).map(o => `${square2san(o.from)}${square2san(o.to)}${o.promotion ? o.promotion.toLowerCase() : ''}`)
    }


    move(from, to, promotion = null, fen = this.fen, onlyEval = false) {
        this.debug && console.log(`Move from ${from} to ${to} with ${!!promotion ? promotion : 'no'} promotion.`)
        
        if (!this.isValidFen(fen)) return MoveEvaluation.INVALID_MOVE;
        let { fenPos, activeColor, castling, enPassant, halfMoveClock, fullMoveNumber } = fen2obj(fen);
        let rposition = rPosFromFen(fen);
        fenPos = fenPos2long(fenPos).split('');
        const figureFrom = rposition[from];
        if (figureFrom === '0') {
            this.debug && console.log("Can't move from empty square"); 
            return MoveEvaluation.INVALID_MOVE;
        }
        const figureTo = rposition[to];
        if (/[Kk]/.test(figureTo)) return MoveEvaluation.INVALID_MOVE;
        const rowcolFrom = index2rowcol(from);
        const [rowFrom, colFrom] = [rowcolFrom.row, rowcolFrom.col];
        const rowcolTo = index2rowcol(to);
        const [rowTo, colTo] = [rowcolTo.row, rowcolTo.col];
        // const nameFrom = rowcol2name(rowFrom, colFrom);
        const nameTo = rowcol2name(rowTo, colTo);

        const isBlackOrigin = 'pnbrqk'.indexOf(figureFrom) !== -1;
        const isWhiteOrigin = 'PNBRQK'.indexOf(figureFrom) !== -1;
        if (!isBlackOrigin && !isWhiteOrigin) {
            this.debug && console.log("La casilla seleccionada no contiene una pieza blanca ni negra");
            return MoveEvaluation.INVALID_MOVE;
        }
        const isBlackDestiny = 'pnbrqk'.indexOf(figureTo) !== -1;
        const isWhiteDestiny = 'PNBRQK'.indexOf(figureTo) !== -1;
        if ((isBlackOrigin && isBlackDestiny) || (isWhiteOrigin && isWhiteDestiny)) {
            this.debug && console.log("No se puede mover una pieza a una casilla con otra del mismo color.");
            return MoveEvaluation.INVALID_MOVE;
        }
        if ((isBlackOrigin && activeColor === 'w') || (isWhiteOrigin && activeColor === 'b')) {
            this.debug && console.log("Movimiento en turno incorrecto.");
            return MoveEvaluation.INVALID_MOVE;
        }
        const isEmptyDestiny = figureTo === '0';
        const isEnPassant = isEmptyDestiny && nameTo === enPassant && /[Pp]/.test(figureFrom);
        const isCapture = !isEmptyDestiny || isEnPassant;

        this.debug && console.log("A continuación se testea movimientos de caballo, alfil, torre y dama.");
        if (/[Nn]/.test(figureFrom) && !this.isKnightMove(from, to)) return MoveEvaluation.INVALID_MOVE; 
        if (/[Bb]/.test(figureFrom) && !this.isBishopMove(from, to)) return MoveEvaluation.INVALID_MOVE; 
        if (/[Rr]/.test(figureFrom) && !this.isRookMove(from, to)) return MoveEvaluation.INVALID_MOVE; 
        if (/[Qq]/.test(figureFrom) && !this.isQueenMove(from, to)) return MoveEvaluation.INVALID_MOVE; 
        this.debug && console.log("A continuación se testea movimientos de rey blanco.");
        if (figureFrom === 'K') {
            if (!this.isWhiteKingMove(from, to)) return MoveEvaluation.INVALID_MOVE;
            if (this.blackAttacksOnSquare(to, rposition).length > 0) return MoveEvaluation.INVALID_MOVE;
            if (this.isWhiteLongCastling(from, to) && this.castling.indexOf('Q') === -1) return MoveEvaluation.INVALID_MOVE;
            if (this.isWhiteShortCastling(from, to) && this.castling.indexOf('K') === -1) return MoveEvaluation.INVALID_MOVE;
            if (this.isWhiteLongCastling(from, to) && [3, 2].filter(sq => this.blackAttacksOnSquare(sq, rposition).length > 0).length > 0) return MoveEvaluation.INVALID_MOVE;
            if (this.isWhiteShortCastling(from, to) && [5, 6].filter(sq => this.blackAttacksOnSquare(sq, rposition).length > 0).length > 0) return MoveEvaluation.INVALID_MOVE;
        }
        this.debug && console.log("A continuación se testea movimientos de rey negro.");
        if (figureFrom === 'k') {
            if (!this.isBlackKingMove(from, to)) return MoveEvaluation.INVALID_MOVE;
            if (this.whiteAttacksOnSquare(to, rposition).length > 0) return MoveEvaluation.INVALID_MOVE;
            if (this.isBlackLongCastling(from, to) && this.castling.indexOf('q') === -1) return MoveEvaluation.INVALID_MOVE;
            if (this.isBlackShortCastling(from, to) && this.castling.indexOf('k') === -1) return MoveEvaluation.INVALID_MOVE;
            if (this.isBlackLongCastling(from, to) && [59, 58].filter(sq => this.whiteAttacksOnSquare(sq, rposition).length > 0).length > 0) return MoveEvaluation.INVALID_MOVE;
            if (this.isBlackShortCastling(from, to) && [61, 62].filter(sq => this.whiteAttacksOnSquare(sq, rposition).length > 0).length > 0) return MoveEvaluation.INVALID_MOVE;
        }
        this.debug && console.log("A continuación se testea movimientos de peón blanco.");
        if (figureFrom === 'P') {
            if (this.isWhitePawnCapture(from, to)) {
                if (!isCapture) {
                    return MoveEvaluation.INVALID_MOVE;
                }
            } else {
                if ((!this.isWhitePawnLongMove(from, to) && !this.isWhitePawnMove(from, to)) || isCapture) {
                    return MoveEvaluation.INVALID_MOVE;
                } 
            }
        }
        this.debug && console.log("A continuación se testea movimientos de peón negro.");
        if (figureFrom === 'p') {
            if (this.isBlackPawnCapture(from, to)) {
                if (!isCapture) {
                    return MoveEvaluation.INVALID_MOVE;
                }
            } else {
                if ((!this.isBlackPawnLongMove(from, to) && !this.isBlackPawnMove(from, to)) || isCapture) {
                    return MoveEvaluation.INVALID_MOVE;
                }
            }
        }

        fenPos[from ^ 56] = '0';
        fenPos[to ^ 56] = figureFrom;

        if (rowTo === 7 && figureFrom === 'P') {
            if (!promotion) {
                this.debug && console.log("Falta información de coronación de peón blanco.")
                return MoveEvaluation.INCOMPLETE_INFO;
            } else {
                fenPos[to ^ 56] = promotion.toUpperCase();
            }
        } else if (rowTo === 0 && figureFrom === 'p') {
            if (!promotion) {
                this.debug && console.log("Falta información de coronación de peón negro.")
                return MoveEvaluation.INCOMPLETE_INFO;
            } else {
                fenPos[to ^ 56] = promotion.toLowerCase();
            }
        }

        const path = this.path(from, to);
        const innerPath = this.innerPath(path);
        if (!this.isClearPath(innerPath, rposition)) {
            this.debug && console.log("Se pretendió mover a lo largo de un camino bloqueado.")
            return MoveEvaluation.INVALID_MOVE;
        }
        if (from === 4 && to === 6 && figureFrom === 'K') {
            fenPos[5 ^ 56] = "R";
            fenPos[7 ^ 56] = "0";
        } else if (from === 4 && to === 2 && figureFrom === 'K') {
            fenPos[3 ^ 56] = "R";
            fenPos[0 ^ 56] = "0";
        } else if (from === 60 && to === 62 && figureFrom === 'k') {
            fenPos[61 ^ 56] = "r";
            fenPos[63 ^ 56] = "0";
        } else if (from === 60 && to === 58 && figureFrom === 'k') {
            fenPos[59 ^ 56] = "r";
            fenPos[56 ^ 56] = "0";
        } else if (isEnPassant && figureFrom === 'P') {
            fenPos[(to - 8) ^ 56] = "0";
        } else if (isEnPassant && figureFrom == 'p') {
            fenPos[(to + 8) ^ 56] = "0";
        }

        fenPos = fenPos2short(fenPos.join(''));
        activeColor = activeColor === "w" ? "b" : "w";
        halfMoveClock = (rposition[to] !== '0') || ("Pp".indexOf(figureFrom) !== -1) ? 0 : +halfMoveClock + 1;
        const oldNumber = fullMoveNumber;
        fullMoveNumber = activeColor === "b" ? fullMoveNumber : +fullMoveNumber + 1;
        if (figureFrom === 'P' && this.difRow(from, to) === 2) {
            enPassant = rowcol2name(rowTo - 1, colTo);
        } else if (figureFrom === 'p' && this.difRow(from, to) === 2 && this.isSameCol(from, to)) {
            enPassant = rowcol2name(rowTo + 1, colTo);
        } else {
            enPassant = '-';
        }
        if (from === 4) {
            castling = castling.replace(/[KQ]/g, '');
        } else if (from === 60) {
            castling = castling.replace(/[kq]/g, '');
        } else if (from === 7 || to === 7) {
            castling = castling.replace('K', '');
        } else if (from === 0 || to === 0) {
            castling = castling.replace('Q', '');
        } else if (from === 63 || to === 63) {
            castling = castling.replace('k', '');
        } else if (from === 56 || to === 56) {
            castling = castling.replace('q', '');
        }
        if (castling === '') {
            castling = '-';
        }

        const newFen = obj2fen({ fenPos, activeColor, castling, enPassant, halfMoveClock, fullMoveNumber});
        if (this.mode === 'strict') {
            if (!this.isValidFen(newFen)) {
                this.debug && console.log("El FEN generado no es válido.")
                return MoveEvaluation.INVALID_MOVE;
            }
        }

        if (onlyEval) {
            return MoveEvaluation.VALID_MOVE;
        }

        const san = this.coords2san(from, to, fen, newFen);

        const figure = figureFrom;

        const who = figure === figure.toUpperCase() ? 'w' : 'b';

        const retObj = {fen: newFen, movedata: { who, san, from, to, figure, promotion, number: oldNumber }};

        this.appendFen(retObj.fen);
        this.appendMove(retObj.movedata);

        return retObj;

    } 

    strMove(movestr, fen = this.fen, onlyEval = false) {
        if (regexCastling.test(movestr)) {
            const { groups: {longCastling}} = movestr.match(regexCastling);
            const { activeColor } = fen2obj(fen);
            let from, to;
            if (activeColor === 'w') {
                from = 4;
                to = longCastling ? 2 : 6;
            } else {
                from = 60;
                to = longCastling ? 58 : 62;
            }
            return this.move(from, to, null, fen, onlyEval);
        }
        if (algebraicRegex.test(movestr.replace(/[\-\=\x]/g, ''))) return this.algebraicMove(movestr, fen, onlyEval);
        if (regexPawn.test(movestr.replace(/[=+#]/g, '')) || regexFigure.test(movestr.replace(/[=+#]/g, ''))) return this.sanMove(movestr, fen, onlyEval);
        return MoveEvaluation.INVALID_MOVE;
    }

    sanMove(movestr, fen = this.fen, onlyEval = false) {
        const fenobj = fen2obj(fen);
        const { activeColor } = fenobj;
        const rposition = rPosFromFen(fen);

        if (regexPawn.test(movestr.replace(/[=+#]/g, ''))) {
            const { groups: { column, to, promotion }} = movestr.replace(/[=+#]/g, '').match(regexPawn);
            // console.log(`Column: ${column} - To: ${to} - Promotion: ${promotion}`);
            if (!to) return MoveEvaluation.INVALID_MOVE;
            const sqTo = san2square(to);
            let sqFrom;
            if (!column) {
                if (activeColor === 'w') {
                    sqFrom = rposition[sqTo - 8] === 'P' ? sqTo - 8 : sqTo - 16;
                } else {
                    sqFrom = rposition[sqTo + 8] === 'p' ? sqTo + 8 : sqTo + 16;
                } 
            } else {
                const origRow = activeColor === 'w' ? to.charCodeAt(1) - 1 : to.charCodeAt(1) + 1;
                return this.algebraicMove(`${column}${String.fromCharCode(origRow)}${to}${promotion ? promotion : ''}`, fen, onlyEval); 
            }
            return this.move(sqFrom, sqTo, promotion, fen, onlyEval);
        } else if (regexFigure.test(movestr.replace(/[=+#]/g, ''))) {
            const { groups: {figure, disambig, to}} = movestr.replace(/[x=#+]/g, '').match(regexFigure);
            //console.log(`Figure: ${figure} - Disambiguation: ${disambig} - To: ${to}`);
            const realFigure = activeColor === 'b' ? figure.toLowerCase() : figure;
            const sqTo = san2square(to);
            let attackers;
            attackers = this.attacksOnSquare(sqTo, activeColor, rposition).filter(pair => rposition[pair[0]] === realFigure);
            const len = attackers.length;
            if (!len) return MoveEvaluation.INVALID_MOVE;
            if (len === 1) {
                return this.move(attackers[0][0], sqTo, null, fen, onlyEval);
            } else {
                if (!disambig) {
                    const realAttackers = activeColor === 'b' ? 
                    attackers.filter(pair => this.blackLegalMoves(fen).map(p => p[0]).includes(pair[0])) : 
                    attackers.filter(pair => this.whiteLegalMoves(fen).map(p => p[0]).includes(pair[0]));
                    if (realAttackers.length !== 1) return MoveEvaluation.INVALID_MOVE;
                    return this.move(realAttackers[0][0], sqTo, null, fen, onlyEval);
                }
                if (disambig.length > 1) {
                    const sqFrom = san2square(`${disambig[0]}${disambig[1]}`);
                    attackers = attackers.filter(pair => pair[0] === sqFrom);
                    if (!attackers.length) {
                        return MoveEvaluation.INVALID_MOVE;
                    }
                    return this.move(attackers[0][0], sqTo, null, fen, onlyEval);
                } else {
                    if (/[a-h]/.test(disambig)) { // Chose disambig by column.
                        attackers = attackers.filter(pair => index2rowcol(pair[0]).col === disambig.charCodeAt(0) - 97);
                        if (!attackers.length) {
                            return MoveEvaluation.INVALID_MOVE;
                        }
                        return this.move(attackers[0][0], sqTo, null, fen, onlyEval);
                    } else if (/[1-8]/.test(disambig)) { // Chose disambig by row.
                        attackers = attackers.filter(pair => index2rowcol(pair[0]).row === disambig.charCodeAt(0) - 49);
                        if (!attackers.length) {
                            return MoveEvaluation.INVALID_MOVE;
                        }
                        return this.move(attackers[0][0], sqTo, null, fen, onlyEval);
                    } else {
                        return MoveEvaluation.INVALID_MOVE;
                    }
                }
            }
        }  else {
            return MoveEvaluation.INVALID_MOVE;
        }
    }

    algebraicMove(movestr, fen = this.fen, onlyEval = false) {
        if (!algebraicRegex.test(movestr.replace(/[\-\=\x]/g, ''))) return MoveEvaluation.INVALID_MOVE;
        const { groups: { from, to , promotion}} = movestr.replace(/[\-\=\x]/g, '').match(/(?<from>[a-h][1-8])(?<to>[a-h][1-8])(?<promotion>[QqRrBbNn]?)/);
        let rowcol = name2rowcol(from);
        const nfrom = rowcol2index(rowcol.row, rowcol.col);
        rowcol = name2rowcol(to);
        const nto = rowcol2index(rowcol.row, rowcol.col);
        return this.move(nfrom, nto, promotion, fen, onlyEval);
    }

    coords2san(from, to, oldFen, newFen) {
        const rpositionOld = rPosFromFen(oldFen);
        const rpositionNew = rPosFromFen(newFen);
        const { activeColor } = fen2obj(newFen);
        const figureFrom = rpositionOld[from];
        const oldFigureTo = rpositionOld[to];
        const newFigureTo = rpositionNew[to];
        const rowcol = index2rowcol(to);

        const figureMoved = /[Pp]/.test(figureFrom) ? '' : figureFrom.toUpperCase();
        let disambiguation = '';
        let attackers = [];
        if (!/[Pp]/.test(figureFrom)) {
            switch(figureFrom) {
                case 'k':
                    if (from === 60 && to === 58) return 'O-O-O';
                    if (from === 60 && to === 62) return 'O-O';
                    break;
                    case 'K':
                        if (from === 4 && to === 2) return 'O-O-O';
                        if (from === 4 && to === 6) return 'O-O';
                        break;
                    case 'n':
                    attackers = this.blackKnightAttacks(rpositionOld);
                    break;
                case 'N':
                    attackers = this.whiteKnightAttacks(rpositionOld);
                    break;
                case 'b':
                    attackers = this.blackBishopAttacks(rpositionOld);
                    break;
                case 'B':
                    attackers = this.whiteBishopAttacks(rpositionOld);
                    break;
                case 'r':
                    attackers = this.blackRookAttacks(rpositionOld);
                    break;
                case 'R':
                    attackers = this.whiteRookAttacks(rpositionOld);
                    break;
                case 'q':
                    attackers = this.blackQueenAttacks(rpositionOld);
                    break;
                case 'Q':
                    attackers = this.whiteQueenAttacks(rpositionOld);
                    break;
                default:
                    attackers = [];
            }
            if (attackers.length > 1) attackers = attackers.filter((pair => this.move(pair[0], pair[1], null, oldFen, true)));
            if (attackers.length > 1) {
                const sqName = rowcol2name(index2rowcol(from).row, index2rowcol(from).col);
                attackers = attackers.filter(pair => pair[1] === to);
                if (attackers.length > 2) {
                    disambiguation = sqName;
                } else if (attackers.length > 1) {
                    const other = attackers[0][0] === from ? attackers[1][0] : attackers[0][0];
                    if (this.isSameCol(from, other)) {
                        disambiguation = sqName[1];
                    } else {
                        disambiguation = sqName[0];
                    }  
                }
            }
        }
        const column = /[Pp]/.test(figureFrom) ? colLetterFromIndex(from) : '';
        const capture = oldFigureTo === '0' ? '' : `${column}x`;
        const nameTo = rowcol2name(rowcol.row, rowcol.col);
        const promotion = newFigureTo !== figureFrom  ? `=${newFigureTo.toUpperCase()}` : '';
        let remark = '';
        if (activeColor === 'b') {
            if (this.isBlackCheckMated(newFen)) {
                remark = '#';
            } else if (this.isBlackChecked(newFen)) {
                remark = '+';
            } 
        } else {
            if (this.isWhiteCheckMated(newFen)) {
                remark = '#';
            } else if (this.isWhiteChecked(newFen)) {
                remark = '+';
            } 
        }
        return `${figureMoved}${disambiguation}${capture}${nameTo}${promotion}${remark}`;
    }

    isWrongFen(fen) {
        if (typeof(fen) !== 'string') return true;
        const { activeColor, castling, enPassant, halfMoveClock, fullMoveNumber } = fen2obj(fen);
        const rposition = rPosFromFen(fen);
        if (rposition.length !== 64) return true;
        if (!/^[wb]$/.test(activeColor)) return true;
        if (!/(^-$)|(^[a-h][1-8]$)/.test(enPassant)) return true;
        if (!/(^-$)|(^[KQkq]{1,4}$)/.test(castling)) return true;
        if (isNaN(parseInt(halfMoveClock)) || isNaN(parseInt(fullMoveNumber))) return true;
        return false;
    }

    equalFens(fen1, fen2) {
        const [obj1, obj2] = [fen2obj(fen1), fen2obj(fen2)];
        this.debug && console.log(`${obj1.fenPos}/${obj2.fenPos} - ${obj1.activeColor}/${obj2.activeColor} - ${obj1.castling}/${obj2.castling}`)
        return obj1.fenPos === obj2.fenPos && obj1.activeColor === obj2.activeColor && obj1.castling === obj2.castling;
    }

    get repetitions() {
        let repetitions = 0;
        const len = this.fens.length - 3;
        const fen = this.fen;                                                                                                                                                                                                         
        for (let outer = len; outer >= 0; outer -= 2) {
            if (this.equalFens(this.fens[outer], fen)) repetitions += 1; 
        } 
        return repetitions;
    }

    isThreeFold(fen = this.fen) {
        return this.repetitions >= 3;
    }

    isFiftyMovesRule(fen = this.fen) {
        const { halfMoveClock } = fen2obj(fen);
        return +halfMoveClock >= 100;
    }

    isLowMaterial(color, fen = this.fen) {
        if (!this.isValidFen(fen)) return true;
        const rpos = rPosFromFen(fen);
        const [friendPawns, enemyPawns] = color === 'w' ?
        [this.whitePawns(rpos), this.blackPawns(rpos)] :
        [this.blackPawns(rpos), this.whitePawns(rpos)];
        const [friendKnights, enemyKnights] = color === 'w' ?
        [this.whiteKnights(rpos), this.blackKnights(rpos)] :
        [this.blackKnights(rpos), this.whiteKnights(rpos)];
        const [friendBishops, enemyBishops] = color === 'w' ?
        [this.whiteBishops(rpos), this.blackBishops(rpos)] :
        [this.blackBishops(rpos), this.whiteBishops(rpos)];
        const [friendRooks, enemyRooks] = color === 'w' ?
        [this.whiteRooks(rpos), this.blackRooks(rpos)] :
        [this.blackRooks(rpos), this.whiteRooks(rpos)];
        const [friendQueens, enemyQueens] = color === 'w' ?
        [this.whiteQueens(rpos), this.blackQueens(rpos)] :
        [this.blackQueens(rpos), this.whiteQueens(rpos)];

        const [fpLen, epLen, fnLen, enLen, fbLen, ebLen, frLen, erLen, fqLen, eqLen] = 
        [friendPawns.length, enemyPawns.length, friendKnights.length, enemyKnights.length, 
         friendBishops.length, enemyBishops.length, friendRooks.length, enemyRooks.length,
        friendQueens.length, enemyQueens.length];

        if (fpLen || frLen || fqLen) return false;
        if (fnLen > 2) return false;
        if (fnLen === 2) {
            if (epLen || enLen || ebLen || erLen || eqLen) {
                return false;
            } else {
                return true;
            }
        }   
        if (fnLen === 1) {
            if (epLen || enLen || ebLen || erLen || fbLen) {
                return false;
            } else {
                return true;
            }
        }
        const flbLen = friendBishops.filter(sq => isLightSquare(sq)).length;
        const fdbLen = friendBishops.filter(sq => isDarkSquare(sq)).length;
        const elbLen = enemyBishops.filter(sq => isLightSquare(sq)).length;
        const edbLen = enemyBishops.filter(sq => isDarkSquare(sq)).length;

        if (flbLen && fdbLen) return false;
        if (flbLen) {
            if (edbLen || epLen || enLen ) {
                return false;
            } else {
                return true;
            }
        }
        if (fdbLen) {
            if (elbLen || epLen || enLen) {
                return false;
            } else {
                return true;
            }
        }

        return true;
    }

    isWhiteLowMaterial(fen = this.fen) {
        return this.isLowMaterial('w', fen);
    }

    isBlackLowMaterial(fen = this.fen) {
        return this.isLowMaterial('b', fen);
    }
    
    toJson() {
        return JSON.stringify({fens: this.fens, moves: this.moves, headers: this.headers ? this.headers : null})
    }

    fromJson(jsonstr) {
        let json;
        try {
            json = JSON.parse(jsonstr);
        } catch(e) {
            console.error(`ERROR parsing JSON string in 'fromJson' method: '${e}'`);
            return false;
        }
        const { fens, moves, headers } = json;
        if (!fens || !moves) return false;
        if (moves.slice(1).some (m => !m.san)) return false;
        if (fens.some(f => this.isWrongFen(f))) return false;
        if (headers) this.headers = headers;
        this.fens = fens;
        this.moves = moves;
        return true;
    }

    isValidFen(fen) {
        const { activeColor } = fen2obj(fen);
        if (activeColor === 'w') {
            if (this.isBlackChecked(fen)) return false;
        } else {
            if (this.isWhiteChecked(fen)) return false;
        }
        const rposition = rPosFromFen(fen);
        if (this.whiteKing(rposition).length !== 1 || this.blackKing(rposition).length !== 1) {
            return false;
        }
        if (this.isWrongFen(fen)) return false;
        return true;
    }

    anyFenPos(index = this.fens.length - 1) {
        if (index < 0 || index >= this.fens.length) return null;
        const fen = this.fens[index];
        return fenPos2long(fen2obj(fen).fenPos);
    }
    get fenPos() {
        return this.anyFenPos();
    }
    anyRFenPos(index = this.fens.length - 1) {
        if (index < 0 || index >= this.fens.length) return null;
        const fenPos = this.anyFenPos(index);
        return "0".repeat(64).split('').map((v, i) => v = fenPos[i ^ 56]).join('')
    }
    get rFenPos() {
        return this.anyRFenPos();
    }
    anyActiveColor(index = this.fens.length - 1) {
        if (index < 0 || index >= this.fens.length) return null;
        const fen = this.fens[index];
        return fen2obj(fen).activeColor;
    }
    get activeColor() {
        return this.anyActiveColor();
    }
    anyCastling(index = this.fens.length - 1) {
        if (index < 0 || index >= this.fens.length) return null;
        const fen = this.fens[index];
        return fen2obj(fen).castling;
    }
    get castling() {
        return this.anyCastling();
    }
    anyEnPassant(index = this.fens.length - 1) {
        if (index < 0 || index >= this.fens.length) return null;
        const fen = this.fens[index];
        return fen2obj(fen).enPassant;
    }
    get enPassant() {
        return this.anyEnPassant();
    }
    anyHalfMoveClock(index = this.fens.length - 1) {
        if (index < 0 || index >= this.fens.length) return null;
        const fen = this.fens[index];
        return +fen2obj(fen).halfMoveClock;
    }
    get halfMoveClock() {
        return +this.anyHalfMoveClock();
    }
    anyFullMoveNumber(index = this.fens.length - 1) {
        if (index < 0 || index >= this.fens.length) return null;
        const fen = this.fens[index];
        return +fen2obj(fen).fullMoveNumber;
    }
    get fullMoveNumber() {
        return +this.anyFullMoveNumber();
    }
    
    col =  sq => index2rowcol(sq).col
    row =  sq => index2rowcol(sq).row
    
    difCol =  (sq1, sq2) => Math.abs(this.col(sq1) - this.col(sq2))
    difRow =  (sq1, sq2) => Math.abs(this.row(sq1) - this.row(sq2))
    
    isSameCol = (sq1, sq2) => this.difCol(sq1, sq2) === 0
    isSameRow = (sq1, sq2) => this.difRow(sq1, sq2) === 0
    isDiagonal = (sq1, sq2) => this.difRow(sq1, sq2) === this.difCol(sq1, sq2)
    isAntiDiagonal = (sq1, sq2) => this.isDiagonal(sq1, sq2) && ((Math.abs(sq1 - sq2) % 7) === 0 && sq1 !== 63 && sq2 !== 63)

    isKnightMove = (sq1, sq2) => (this.difRow(sq1, sq2) === 2 && this.difCol(sq1, sq2) === 1) || (this.difRow(sq1, sq2) === 1 && this.difCol(sq1, sq2) === 2)
    isBishopMove = (sq1, sq2) => this.isDiagonal(sq1, sq2)
    isRookMove = (sq1, sq2) => this.isSameCol(sq1, sq2) || this.isSameRow(sq1, sq2)
    isQueenMove = (sq1, sq2) => this.isRookMove(sq1, sq2) || this.isBishopMove(sq1, sq2)
    isWhiteShortCastling = (sq1, sq2) => sq1 === 4 && sq2 === 6
    isWhiteLongCastling = (sq1, sq2) => sq1 === 4 && sq2 === 2
    isBlackShortCastling = (sq1, sq2) => sq1 === 60 && sq2 === 62
    isBlackLongCastling = (sq1, sq2) => sq1 === 60 && sq2 === 58
    isKingSimpleMove = (sq1, sq2) => this.isQueenMove(sq1, sq2) && this.difCol(sq1, sq2) < 2 && this.difRow(sq1, sq2) < 2
    isBlackKingMove = (sq1, sq2) => this.isKingSimpleMove(sq1, sq2) || this.isBlackShortCastling(sq1, sq2) || this.isBlackLongCastling(sq1, sq2)
    isWhiteKingMove = (sq1, sq2) => this.isKingSimpleMove(sq1, sq2) || this.isWhiteShortCastling(sq1, sq2) || this.isWhiteLongCastling(sq1, sq2)
    isBlackPawnMove = (sq1, sq2) => this.isSameCol(sq1, sq2) && index2rowcol(sq2).row === (index2rowcol(sq1).row - 1)
    isBlackPawnLongMove = (sq1, sq2) => this.isSameCol(sq1, sq2) && index2rowcol(sq2).row === 4 && index2rowcol(sq1).row === 6;
    isBlackPawnCapture = (sq1, sq2) => this.isDiagonal(sq1, sq2) && index2rowcol(sq2).row === (index2rowcol(sq1).row - 1);
    isWhitePawnMove = (sq1, sq2) => this.isSameCol(sq1, sq2) && index2rowcol(sq2).row === (index2rowcol(sq1).row + 1)
    isWhitePawnLongMove = (sq1, sq2) => this.isSameCol(sq1, sq2) && index2rowcol(sq2).row === 3 && index2rowcol(sq1).row === 1;
    isWhitePawnCapture = (sq1, sq2) => this.isDiagonal(sq1, sq2) && index2rowcol(sq2).row === (index2rowcol(sq1).row + 1);

    path = (sq1, sq2) => {
        let retval = [];
        if (sq1 === sq2) return retval;
        if (this.isKnightMove(sq1, sq2)) return [sq1, sq2];
        const [begin, end] = sq1 < sq2 ? [sq1, sq2] : [sq2, sq1];
        let step;
        if (this.isAntiDiagonal(sq1, sq2)) {
            step = MoveSteps.ANTI_DIAGONAL;
        } else if (this.isDiagonal(sq1, sq2)) {
            step = MoveSteps.DIAGONAL;
        } else if (this.isSameCol(sq1, sq2)) {
            step = MoveSteps.ROW;
        } else if (this.isSameRow(sq1, sq2)) {
            step = MoveSteps.COLUMN;
        } else {
            return [];
        }
        
        for (let n = begin; n <= end; n += step) {
            retval.push(n);
        }

        return retval;
    }

    innerPath = path => {
        const len = path.length;
        if (len < 3) return [];
        return path.slice(1, path.length - 1);
    }

    isClearPath = (path, pos) => {
        const len = path.length;
        for (let n = 0; n < len; n++) {
            if (pos[path[n]] !== '0') return false;
        }
        return true;
    }

    army = (figure, rpos) => {
        let retval = [];
        const len = rpos.length;
        for (let n = 0; n < len; n++) {
            if (rpos[n] === figure) {
                retval = [...retval, n];
            }
        }{}
        return retval;
    } 

    emptySquares = (rpos = this.rFenPos) => this.army('0', rpos)

    whitePawns = (rpos = this.rFenPos) => this.army('P', rpos)
    whiteKnights = (rpos = this.rFenPos) => this.army('N', rpos)
    whiteBishops = (rpos = this.rFenPos) => this.army('B', rpos)
    whiteRooks = (rpos = this.rFenPos) => this.army('R', rpos)
    whiteQueens = (rpos = this.rFenPos) => this.army('Q', rpos)
    whiteKing = (rpos = this.rFenPos) => this.army('K', rpos)
    whiteArmy = (rpos = this.rFenPos) => [...this.whitePawns(rpos), 
                         ...this.whiteKnights(rpos),
                         ...this.whiteBishops(rpos),
                         ...this.whiteRooks(rpos),
                         ...this.whiteQueens(rpos),
                         ...this.whiteKing(rpos), 
                       ]

    blackPawns = (rpos = this.rFenPos) => this.army('p', rpos)
    blackKnights = (rpos = this.rFenPos) => this.army('n', rpos)
    blackBishops = (rpos = this.rFenPos) => this.army('b', rpos)
    blackRooks = (rpos = this.rFenPos) => this.army('r', rpos)
    blackQueens = (rpos = this.rFenPos) => this.army('q', rpos)
    blackKing = (rpos = this.rFenPos) => this.army('k', rpos)
    blackArmy = (rpos = this.rFenPos) => [...this.blackPawns(rpos), 
                         ...this.blackKnights(rpos),
                         ...this.blackBishops(rpos),
                         ...this.blackRooks(rpos),
                         ...this.blackQueens(rpos),
                         ...this.blackKing(rpos), 
                        ]
    
    pawnMoves = (figure, rpos) => {
        let retval = [];
        if (!/[Pp]/.test(figure)) return retval;
        let army, baserow, op;
        if(figure === 'P') {
            army = this.whitePawns(rpos);
            baserow = 1;
            op = (index, off) => index + off 
        } else {
            army = this.blackPawns(rpos);
            baserow = 6;
            op = (index, off) => index - off 
        }
        const len = army.length;
        for (let n = 0; n < len; n++) {
            const row = index2rowcol(army[n]).row;
            let destiny = op(army[n], 8);
            if (rpos[destiny] === '0') {
                retval = [...retval, [army[n], destiny]]; 
                if (row === baserow) {
                    destiny = op(army[n], 16);
                    if (rpos[destiny] === '0') {
                        retval = [...retval, [army[n], destiny]]; 
                    }
                }
            }
        }
        return retval;
    }

    whitePawnMoves = (rpos = this.rFenPos) => this.pawnMoves('P', rpos)
    blackPawnMoves = (rpos = this.rFenPos) => this.pawnMoves('p', rpos)

    attacks = (figure, rpos) => {
        let retval = [];
        let army;
        switch (figure) {
            case 'p':
                army = this.blackPawns(rpos);
                for (let n = 0; n < army.length; n++) {
                    const col = index2rowcol(army[n]).col;
                    if (col === 0) {
                        retval = [...retval, [army[n], army[n] - 7]];
                    } else if (col === 7) {
                        retval = [...retval, [army[n], army[n] - 9]];
                    } else {
                        retval = [...retval, [army[n], army[n] - 7], [army[n], army[n] - 9]];
                    }
                }
                return retval;
            case 'P':
                army = this.whitePawns(rpos);
                for (let n = 0; n < army.length; n++) {
                    const col = index2rowcol(army[n]).col;
                    if (col === 0) {
                        retval = [...retval, [army[n], army[n] + 9]];
                    } else if (col === 7) {
                        retval = [...retval, [army[n], army[n] + 7]];
                    } else {
                        retval = [...retval, [army[n], army[n]  + 9], [army[n], army[n] + 7]];
                    }
                }
                return retval;
            case 'n':
                army = this.blackKnights(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (this.isKnightMove(army[n], sq)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'N':
                army = this.whiteKnights(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (this.isKnightMove(army[n], sq)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'b':
                army = this.blackBishops(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isBishopMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'B':
                army = this.whiteBishops(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isBishopMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'r':
                army = this.blackRooks(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isRookMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'R':
                army = this.whiteRooks(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isRookMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'q':
                army = this.blackQueens(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isQueenMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'Q':
                army = this.whiteQueens(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isQueenMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'k':
                army = this.blackKing(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isKingSimpleMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            case 'K':
                army = this.whiteKing(rpos);
                for (let n = 0; n < army.length; n++) {
                    for (let sq = 0; sq < 64; sq++) {
                        if (army[n] === sq) continue;
                        if (this.isKingSimpleMove(army[n], sq) && this.isClearPath(this.innerPath(this.path(army[n], sq)), rpos)) {
                            retval = [...retval, [army[n], sq]];
                        }
                    }
                }
                return retval;
            default:
                return retval;
        }
    }

    whitePawnAttacks = (rpos = this.rFenPos) => this.attacks('P', rpos);
    whiteKnightAttacks = (rpos = this.rFenPos) => this.attacks('N', rpos);
    whiteBishopAttacks = (rpos = this.rFenPos) => this.attacks('B', rpos);
    whiteRookAttacks = (rpos = this.rFenPos) => this.attacks('R', rpos);
    whiteQueenAttacks = (rpos = this.rFenPos) => this.attacks('Q', rpos);
    whiteKingAttacks = (rpos = this.rFenPos) => this.attacks('K', rpos);
    whiteAttacks = (rpos = this.rFenPos) => [...this.whitePawnAttacks(rpos),
                            ...this.whiteKnightAttacks(rpos),
                            ...this.whiteBishopAttacks(rpos),
                            ...this.whiteRookAttacks(rpos),
                            ...this.whiteQueenAttacks(rpos),
                            ...this.whiteKingAttacks(rpos)
                           ]

    blackPawnAttacks = (rpos = this.rFenPos) => this.attacks('p', rpos);
    blackKnightAttacks = (rpos = this.rFenPos) => this.attacks('n', rpos);
    blackBishopAttacks = (rpos = this.rFenPos) => this.attacks('b', rpos);
    blackRookAttacks = (rpos = this.rFenPos) => this.attacks('r', rpos);
    blackQueenAttacks = (rpos = this.rFenPos) => this.attacks('q', rpos);
    blackKingAttacks = (rpos = this.rFenPos) => this.attacks('k', rpos);
    blackAttacks = (rpos = this.rFenPos) => [...this.blackPawnAttacks(rpos),
                            ...this.blackKnightAttacks(rpos),
                            ...this.blackBishopAttacks(rpos),
                            ...this.blackRookAttacks(rpos),
                            ...this.blackQueenAttacks(rpos),
                            ...this.blackKingAttacks(rpos)
                            ]

    whiteAllMoves = (rpos = this.rFenPos) => [...this.whiteAttacks(rpos), ...this.whitePawnMoves(rpos)]                        
    blackAllMoves = (rpos = this.rFenPos) => [...this.blackAttacks(rpos), ...this.blackPawnMoves(rpos)]                        
    whiteRealMoves = (rpos = this.rFenPos) => this.whiteAllMoves(rpos).filter(pair => 'PNBRQKk'.indexOf(rpos[pair[1]]) === -1)
    .filter(pair => !(this.isWhitePawnCapture(pair[0], pair[1]) && rpos[pair[1]] === '0' && rpos[pair[0]] === 'P'))
    blackRealMoves = (rpos = this.rFenPos) => this.blackAllMoves(rpos).filter(pair => 'pnbrqkK'.indexOf(rpos[pair[1]]) === -1)
    .filter(pair => !(this.isBlackPawnCapture(pair[0], pair[1]) && rpos[pair[1]] === '0' && rpos[pair[0]] === 'p'))
    whiteLegalMoves = (fen = this.fen) => this.whiteRealMoves(rPosFromFen(fen)).filter(pair => !!this.move(pair[0], pair[1], 'Q', fen, true))
    blackLegalMoves = (fen = this.fen) => this.blackRealMoves(rPosFromFen(fen)).filter(pair => !!this.move(pair[0], pair[1], 'Q', fen, true))

    kingSquare(borw = 'w', rpos = this.rFenPos) {
        if (!/[bw]/.test(borw)) return null;
        return borw === 'w' ? this.whiteKing(rpos)[0] : this.blackKing(rpos)[0];
    }                    
                                                  
    whiteKingSquare = (rpos = this.rFenPos) => this.kingSquare("w", rpos)
    blackKingSquare = (rpos = this.rFenPos) => this.kingSquare("b", rpos)

    attacksOnSquare = (sq, foe, rpos) => {
        const attackers = foe === "w" ? this.whiteAttacks(rpos) : this.blackAttacks(rpos);
        return attackers.filter(s => sq === s[1])
    }

    whiteAttacksOnSquare = (sq, rpos) => this.attacksOnSquare(sq, "w", rpos);
    blackAttacksOnSquare = (sq, rpos) => this.attacksOnSquare(sq, "b", rpos);
    whiteChecks = (rpos = this.rFenPos) => this.whiteAttacksOnSquare(this.blackKingSquare(rpos), rpos)
    blackChecks = (rpos = this.rFenPos) => this.blackAttacksOnSquare(this.whiteKingSquare(rpos), rpos)
    isWhiteChecked = (fen = this.fen) => this.blackChecks(rPosFromFen(fen)).length > 0
    isBlackChecked = (fen = this.fen) => this.whiteChecks(rPosFromFen(fen)).length > 0
    isWhiteCheckMated = (fen = this.fen) => this.blackChecks(rPosFromFen(fen)).length > 0 && 
        activeColorFromFen(fen ) === 'w' && this.whiteLegalMoves(fen).length === 0;
    isBlackCheckMated = (fen = this.fen) => this.whiteChecks(rPosFromFen(fen)).length > 0 && 
        activeColorFromFen(fen ) === 'b' && this.blackLegalMoves(fen).length === 0;
    isWhiteStaleMated = (fen = this.fen) => this.blackChecks(rPosFromFen(fen)).length === 0 && 
        activeColorFromFen(fen ) === 'w' && this.whiteLegalMoves(fen).length === 0;
    isBlackStaleMated = (fen = this.fen) => this.whiteChecks(rPosFromFen(fen)).length === 0 && 
        activeColorFromFen(fen ) === 'b' && this.blackLegalMoves(fen).length === 0;

}

class FakeValidator extends ChessValidator {
    constructor(fen = defaultFen, debug = false, mode = 'non-strict') {
        super(fen, debug, mode);
    }


    move(from, to, promotion = null, fen = this.fen, onlyEval = false) {
        console.log(`Move from ${from} to ${to} with ${!!promotion ? promotion : 'no'} promotion.`)
        
        const fenobj = fen2obj(fen);
        const lFenPos = fenPos2long(fenobj.fenPos).split('');
        const figure  = lFenPos[from ^ 56];
        if (promotion) {
            lFenPos[to ^ 56] = promotion;
        } else {
            lFenPos[to ^ 56] = figure;
        }
        lFenPos[from ^ 56] = '0';
        fenobj.activeColor = fenobj.activeColor === 'w' ? 'b' : 'w';
        fenobj.fenPos = fenPos2short(lFenPos.join(''));
        const newFen = obj2fen(fenobj);
        // if (!this.isValidFen(newFen)) return MoveEvaluation.INVALID_MOVE;
        this.fens = [newFen];
        const retObj = {fen: newFen, move: {from, to, promotion, figure, san: `${figure}${square2san(to)}`}};
        console.info(retObj);
        return retObj;
    }
}


class ChessGame extends ChessValidator {
    constructor(fen = defaultFen, 
        debug = false,
        mode = 'strict',
        event = 'Internet game',
        site = 'Internet',
        date = pgnDate(),
        round = '1',
        white = 'White Player', 
        black = 'Black Player', 
        result = GameResults.ONGOING) {
        super(fen, debug, mode);
        this.headers = {event, site, date, round, white, black, result};
    }

    get title() {
        return `${this.headers.white} - ${this.headers.black}   ${this.headers.result || '*'}`
    }

    reset(fen = this.fens[0], 
        event = 'Internet game',
        site = 'Internet',
        date = pgnDate(),
        round = '1',
        white = 'White Player', 
        black = 'Black Player', 
        result = GameResults.ONGOING,
        termination = '') {
        super.reset(fen);
        this.headers = {event, site, date, round, white, black, result, termination};
    }

   fromPgn(pgnStr) {
        const [headers, sans] = pgnStr.split(/[\n\r]{2,}/);
        const headerlines = headers.split(/[\n\r]/g);
        if (headerlines.length) {
            this.headers = {};
        } else {
            return;
        }
        for (let n = 0; n < headerlines.length; n += 1) {
            //console.log(headerlines[n]);
            if (headerRegex.test(headerlines[n])) {
                const { groups: { header, value }} = headerlines[n].match(headerRegex);
                if (header && value) {
                    this.headers[header.toLowerCase()] = value;
                }
            }
        }
        const tokensList = sans.split(/\s+/g);
        const movesList = tokensList.map(san => san.replace(/^\d+\./, ''))
        .filter(san => regexFigure.test(san) || regexPawn.test(san) || regexCastling.test(san));
        let nummoves = 0;
        if (!movesList.length) return nummoves;
        this.fens = [this.fens[0]];
        this.moves = [this.moves[0]];
        const oldMode = this.mode;
        // this.mode = 'nonstrict';
        movesList.forEach(san => {
                // document && document.body && (document.body.style.cursor = 'wait');
                const pair = this.strMove(san);
                if (pair) {
                    //this.appendFen(pair.fen);
                    //this.appendMove(pair.movedata);
                    nummoves += 1;
                }
                // document && document.body && (document.body.style.cursor = 'default');
        })
        this.mode = oldMode;
        return nummoves;
    }

    move(from, to, promotion = null, fen = this.fen, onlyEval = false) {
        const retobj = super.move(from, to, promotion, fen, onlyEval);
        if (retobj === MoveEvaluation.INVALID_MOVE || retobj === MoveEvaluation.INCOMPLETE_INFO) return retobj;
        if (!onlyEval) {
            const { fen } = retobj;
            if (!this.isValidFen(fen)) return retobj;
            const { activeColor } = fen2obj(fen);
            const [isMate, isStaleMate, winStr] = activeColor === 'w' ? 
            [this.isWhiteCheckMated, this.isWhiteStaleMated, GameResults.BLACK_WIN] : 
            [this.isBlackCheckMated, this.isBlackStaleMated, GameResults.WHITE_WIN];
            if (isMate(fen)) {
                this.headers.result = winStr;
                this.headers.termination = "Checkmate";
            } else if (isStaleMate(fen)) {
                this.headers.result = GameResults.DRAW;
                this.headers.termination = "Stalemate";
            } else if (this.isWhiteLowMaterial(fen) && this.isBlackLowMaterial(fen)) {
                this.headers.result = GameResults.DRAW;
                this.headers.termination = "Low material";
            } else if (this.isFiftyMovesRule(fen)) {
                this.headers.result = GameResults.DRAW;
                this.headers.termination = "Fifty moves rule";
            } else if (this.isThreeFold(fen)) {
                this.headers.result = GameResults.DRAW;
                this.headers.termination = "Threefold repetition";
            }
        }
        return retobj;
    }

    undo() {
        super.undo();
        this.headers.result = GameResults.ONGOING;
        this.headers.termination = '';
    }

    emitRepaint(reason = "content") {
        const ev = new CustomEvent('repaint', {detail: {reason, current: this.current}});
        this.dispatchEvent(ev);
    }

}

class ChessGameCollection {
    constructor() {
        this.games = [];
    }

    load(pgntext) {
        this.games = [];
        const halves = pgntext.split(/[\r\n]{2,}/g);
        const hlen = halves.length;
        // console.log(`Loading ${hlen} pgn halves.`);
        const fulls = [];
        for (let n = 0; n < hlen; n += 2) {
            fulls.push(`${halves[n]}\n\n${halves[n + 1]}`)
        }
        const plen = fulls.length;
        // console.log(`Loading ${plen} pgn games.`);
        for (let n = 0; n < plen; n += 1) {
            this.games[n] = new ChessGame();
            //console.log(`Loading \n\n${fulls[n]}\n\n--------------------\n\n`);
            this.games[n].fromPgn(fulls[n]);
        }
        console.log(`Ended processing ${plen} games.`);
        return this.games.length;
    }

    async loadFile(filename) {
        try {
            const result = await fetch(filename);
            const pgn = await result.text();
            // console.log(pgn);
            return this.load(pgn.replace(/\r\n/g, '\n'));
        } catch(e) {
            console.log(`ERROR: ${e}`)
        }
    }
}

async function pgnReader(filename) {
    const pgnNull = function*() {
        yield null;
        return;
    }
    const pgnGen = function*(pgntext) {
        const halves = pgntext.split(/[\r\n]{2,}/g);
        const hlen = halves.length;
        const fulls = [];
        for (let n = 0; n < hlen; n += 2) {
            fulls.push(`${halves[n]}\n\n${halves[n + 1]}`)
        }
        const plen = fulls.length;
        for (let n = 0; n < plen; n += 1) {
            const game = new ChessGame();
            game.fromPgn(fulls[n]);
            yield game;
        }
        console.log(`Ended processing ${plen} games.`);
        return plen;
    };

    try {
        const result = await fetch(filename);
        // console.log(`${filename} fetch was ${result.ok}.`)
        if (!result.ok) {
            console.error(`ERROR in 'pgnReader': resource ${filename} not.found.`);
            return pgnNull();
        }
        const pgn = await result.text();
        // console.log(pgn);
        return pgnGen(pgn.replace(/\r\n/g, '\n'));
    } catch(e) {
        console.log(`ERROR: ${e}`)
    }
}

//////////////

export {
    versionInfo, version, genRange, range, onePixel, classicSet, asciiHorzLine, asciiVertline, asciiRow, asciiBoard,
    svg_figures, blackFigures, whiteFigures, figures, rowArray, colArray, resultRegex, headerRegex,
    algebraicRegex, regexFigure, regexPawn, regexCastling,
    defaultFen, emptyFen, frenchFen, sicilianFen, caroKanFen, 
    smotheredFen, helpedMateFen, KnightandBishopFen, mateIn3Fen,
    evergreen_json, evergreen_pgn, inmortal_json, inmortal_pgn, 
    boardColors, MoveEvaluation, GameResults, MoveSteps, seven_tag_roster, 
    pad, isOdd, isEven, capitalize, title, 
    rowcol2name, name2rowcol, square2san, san2square, rowFromIndex, colFromIndex, 
    index2rowcol, rowcol2index, colLetterFromIndex, rowNumberFromIndex, 
    isDarkSquare, isLightSquare, fen2obj, obj2fen, fenPos2short, fenPos2long, 
    rPosFromFen, activeColorFromFen, pgnDate, 
    ChessValidator, FakeValidator, ChessGame, ChessGameCollection, pgnReader
}
