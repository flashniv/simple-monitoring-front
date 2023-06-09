import * as React from 'react';
import {Box, Typography} from "@mui/material";

export default function Markdown(props: any) {
    return (
        <Box
            sx={{textAlign: "justify"}}
        >
            <Typography variant={"h2"} pb={2}>
                Sample blog post
            </Typography>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam turpis enim, hendrerit mattis lectus
            tincidunt, condimentum tempor elit. Nam ut tempus tellus. Donec consectetur ligula sit amet posuere egestas.
            Aliquam consequat condimentum lectus sit amet vestibulum. Cras nec tellus porttitor, commodo leo id,
            consequat eros. In lacinia ultricies maximus. Aliquam a accumsan lectus. Nunc sed tortor turpis. Maecenas
            quis lorem eleifend, rutrum dui nec, sollicitudin mi. Integer ornare tellus ac lacus malesuada, id varius
            lorem aliquam. Maecenas vel mattis augue.

            Duis quis aliquam magna. Cras facilisis risus sed felis placerat elementum. Praesent nec nunc ante. Etiam
            eget nunc ligula. Nulla gravida vel lectus sed blandit. Nam ut ultrices quam. Proin eu finibus lacus.
            Vestibulum ipsum erat, luctus nec mollis eget, suscipit id leo. Donec rhoncus lorem eget tempus accumsan.
            Donec eget dolor et sem iaculis pharetra vitae eu justo. Integer ut suscipit diam. Vestibulum nibh orci,
            sagittis eget vehicula a, malesuada eu diam. Nullam varius ac dolor non tempor.

            Quisque tempor dui fringilla vulputate vestibulum. Aenean varius, dui id consequat faucibus, leo tortor
            elementum eros, venenatis sodales arcu justo ac leo. Maecenas fringilla ultrices metus eget facilisis. Morbi
            a fringilla neque, dignissim efficitur arcu. Cras semper velit in ultrices dignissim. Duis eleifend sapien a
            vestibulum sodales. Praesent vestibulum urna eu risus imperdiet, eu ullamcorper sem imperdiet. Integer
            pulvinar, nibh vitae aliquam finibus, lectus diam pretium velit, eu fermentum diam metus ut nunc. Aenean
            laoreet posuere elit non semper. Mauris congue cursus quam, sed bibendum dui ultricies eu. Pellentesque id
            elementum quam. Fusce sed porta sapien. Etiam eget risus feugiat turpis elementum dapibus tristique non sem.
            Duis et augue ultricies nibh varius tincidunt ut a velit.

            Etiam lobortis nibh mattis, bibendum tellus et, volutpat arcu. Aliquam efficitur arcu eget nisl euismod
            viverra. Praesent eleifend, felis eget auctor consectetur, purus enim congue dui, eget imperdiet augue nibh
            fringilla est. Donec a aliquam ante. Praesent quis ligula hendrerit, tempus lacus in, pretium ipsum.
            Vestibulum interdum est non mattis ultricies. Ut condimentum sit amet metus eget sagittis. Praesent non orci
            et neque bibendum eleifend. Vestibulum et laoreet ex. Duis accumsan velit ut diam tincidunt, ut tempus sem
            vestibulum. In sit amet tortor ac urna egestas congue nec vel augue.
        </Box>
    );
}
