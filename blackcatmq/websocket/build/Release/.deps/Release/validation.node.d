cmd_Release/validation.node := c++ -bundle -undefined dynamic_lookup -Wl,-search_paths_first -mmacosx-version-min=10.5 -arch x86_64 -L./Release  -o Release/validation.node Release/obj.target/validation/src/validation.o 
